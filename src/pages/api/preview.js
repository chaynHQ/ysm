import { axiosGet } from '../../shared/axios';
import rollbar from '../../shared/rollbar';

export default async function handler(req, res) {
  if (req.query.token) {
    try {
      const previewModeCheck = await axiosGet('/',
        {
          headers: {
            'X-PREVIEW-MODE': 'preview',
            authorization: `Bearer ${req.query.token}`,
          },
        });
      if (previewModeCheck.previewMode) {
        res.setPreviewData({});
        res.status(200).json({ message: "Preview mode turned on! You'll now see all the latest content including any new draft content that's not yet published.", allowed: true });
      } else {
        res.clearPreviewData();
        res.status(200).json({ message: "Preview mode couldn't be turned on. Please try again or get in touch with the dev team.", allowed: false });
      }
    } catch (err) {
      res.clearPreviewData();
      res.status(200).json({ message: 'Preview mode cannot be turned on because your email is not on the list of approved content editors. Please get in touch with the dev team.', allowed: false });
    }
  } else if (req.query.revokeAccess) {
    res.clearPreviewData();
    res.status(200).json({ message: 'Preview mode is now turned off.', allowed: false });
  } else {
    res.clearPreviewData();
    res.status(200).json({ message: 'Preview mode is now turned off.', allowed: false });
    rollbar.error('Trying to set preview mode with incorrect data', req.query);
  }
}
