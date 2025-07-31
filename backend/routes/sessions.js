import express from 'express';
import Session from '../models/Session.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all published sessions (public)
router.get('/sessions', async (req, res) => {
  try {
    const sessions = await Session.find({ status: 'published' })
      .populate('author', 'email')
      .sort({ published_at: -1 });

    res.json({
      success: true,
      sessions
    });
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user's own sessions (private)
router.get('/my-sessions', authenticate, async (req, res) => {
  try {
    const sessions = await Session.find({ author: req.user._id })
      .sort({ updated_at: -1 });

    res.json({
      success: true,
      sessions
    });
  } catch (error) {
    console.error('Get my sessions error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get specific session (private)
router.get('/my-sessions/:id', authenticate, async (req, res) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      author: req.user._id
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    res.json({
      success: true,
      session
    });
  } catch (error) {
    console.error('Get session error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Save draft
router.post('/my-sessions/save-draft', authenticate, async (req, res) => {
  try {
    const { id, title, tags, json_file_url } = req.body;

    if (!title || !json_file_url) {
      return res.status(400).json({
        success: false,
        message: 'Title and JSON file URL are required'
      });
    }

    let session;
    if (id) {
      // Update existing session
      session = await Session.findOneAndUpdate(
        { _id: id, author: req.user._id },
        {
          title,
          tags: Array.isArray(tags) ? tags : [],
          json_file_url,
          status: 'draft'
        },
        { new: true }
      );

      if (!session) {
        return res.status(404).json({
          success: false,
          message: 'Session not found'
        });
      }
    } else {
      // Create new session
      session = new Session({
        title,
        tags: Array.isArray(tags) ? tags : [],
        json_file_url,
        status: 'draft',
        author: req.user._id
      });
      await session.save();
    }

    res.json({
      success: true,
      message: 'Draft saved successfully',
      session
    });
  } catch (error) {
    console.error('Save draft error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Publish session
router.post('/my-sessions/publish', authenticate, async (req, res) => {
  try {
    const { id, title, tags, json_file_url } = req.body;

    if (!title || !json_file_url) {
      return res.status(400).json({
        success: false,
        message: 'Title and JSON file URL are required'
      });
    }

    let session;
    if (id) {
      // Update existing session
      session = await Session.findOneAndUpdate(
        { _id: id, author: req.user._id },
        {
          title,
          tags: Array.isArray(tags) ? tags : [],
          json_file_url,
          status: 'published'
        },
        { new: true }
      );

      if (!session) {
        return res.status(404).json({
          success: false,
          message: 'Session not found'
        });
      }
    } else {
      // Create new session
      session = new Session({
        title,
        tags: Array.isArray(tags) ? tags : [],
        json_file_url,
        status: 'published',
        author: req.user._id
      });
      await session.save();
    }

    res.json({
      success: true,
      message: 'Session published successfully',
      session
    });
  } catch (error) {
    console.error('Publish session error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;