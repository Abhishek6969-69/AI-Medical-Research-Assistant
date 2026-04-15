const express = require('express')
const crypto = require('crypto')

const Conversation = require('../models/Conversation')
const {
  fetchPubMed,
  fetchOpenAlex,
  fetchTrials,
} = require('../services/searchFetchers')

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { conversationId, name, disease, location, focus, query } = req.body || {}

    if (!name || !disease || !focus || !query) {
      return res.status(400).json({
        message: 'name, disease, focus, and query are required',
      })
    }

    const nextConversationId = conversationId || crypto.randomUUID()
    const now = new Date()
    const cleanedQuery = query.trim()
    const cleanedDisease = disease.trim()
    const expandedQuery = `${cleanedQuery} ${cleanedDisease}`.trim()

    const [pubmedResults, openAlexResults, trialResults] = await Promise.all([
      fetchPubMed(expandedQuery),
      fetchOpenAlex(expandedQuery),
      fetchTrials(cleanedDisease, location?.trim?.() || ''),
    ])

    const rawPool = [...pubmedResults, ...openAlexResults, ...trialResults]
    const sourceCounts = {
      PubMed: pubmedResults.length,
      OpenAlex: openAlexResults.length,
      ClinicalTrials: trialResults.length,
    }

    const conversation = await Conversation.findOneAndUpdate(
      { conversationId: nextConversationId },
      {
        $setOnInsert: {
          conversationId: nextConversationId,
          messages: [],
        },
        $set: {
          patient: {
            name: name.trim(),
            disease: cleanedDisease,
            location: location?.trim?.() || '',
            focus: focus.trim(),
          },
          lastQuery: expandedQuery,
          updatedAt: now,
        },
        $push: {
          messages: {
            role: 'user',
            content: cleanedQuery,
            createdAt: now,
          },
        },
      },
      {
        new: true,
        upsert: true,
      },
    )

    return res.json({
      message: 'Stage 4 parallel fetch completed',
      stage: 4,
      conversationId: conversation.conversationId,
      saved: true,
      expandedQuery,
      rawPoolCount: rawPool.length,
      sourceCounts,
      received: {
        conversationId: nextConversationId,
        name,
        disease,
        location,
        focus,
        query,
      },
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Unable to process chat payload',
    })
  }
})

module.exports = router
