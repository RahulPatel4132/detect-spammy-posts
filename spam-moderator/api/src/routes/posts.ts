import { Router } from 'express';
import { evaluatePost } from '../services/moderation';
import { tweet } from '../clients/twitter';

const router = Router();

router.post('/', async (req, res) => {
  const { text } = req.body as { text?: string };
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'text is required' });
  }

  const result = evaluatePost(text);

  if (result.status === 'FLAGGED') {
    // Reject right away – nothing goes to Twitter
    return res.status(400).json(result);
  }

  try {
    const twResp = await tweet(text);
    return res.status(201).json({
      status: 'POSTED',
      twitterId: twResp.data.id,
      link: `https://twitter.com/i/web/status/${twResp.data.id}`,
    });
  } catch (err: any) {
    console.error('Twitter error', err);
    // Fallback: accept, but mark as failed to post
    return res.status(502).json({
      status: 'ERROR',
      message: 'Failed to post to Twitter',
      twitterError: err.data ?? err.message,
    });
  }
});

export default router;
