import express from "express";
import routes from "../routes";
import { deleteVideo, getEditVideo, postEditVideo, postUpload, videoDetail, getupload } from "../controllers/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

//videoRouter.get("/", videos);

// Upload
videoRouter.get(routes.upload, getupload);
videoRouter.post(routes.upload, uploadVideo, postUpload)

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit Video
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

// Delete Video
videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;