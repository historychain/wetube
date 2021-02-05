import routes from "../routes";
import Video from "../models/Video";
import { response } from "express";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ _id: -1});

        res.render("home", { pageTitle: "Home", videos });
    } catch(error) {
        res.render("home", { pageTitle: "Home", videos : []});
    }
}

export const search = (req, res) => {
    const { query: { term: searchingBy}} = req;
    res.render("search", { pageTitle: "Search", searchingBy, videos });
}

export const getupload = (req, res) => res.render("upload", { pageTitle: "Upload" });
export const postUpload = async (req, res) => {
    // To Do Video Upload and then redirect video detail

    const { 
        body: { title, description },
        file: { path }
    } = req;

    const newVideo = await Video.create({
        fileUrl: path,
        title: title,
        description: description
    });
    console.log(newVideo);

    res.redirect(routes.videoDetail(newVideo.id));
}
export const videoDetail = async (req, res) => {
    const { params: { id } } = req;
  
    const video = await Video.findById(id);

    try {
        res.render("videoDetail", { pageTitle: "Video Detail", video });   
    } catch(error) {
        console.log(error);
        res.redirect(routes.home);
    }
}

export const getEditVideo = async (req, res) => {
    const { params: { id } } = req;

    const video = await Video.findById(id); 

    try {
        res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    } catch(error) {
        console.log(error);
        res.redirect(routes.home);
    }
}
export const postEditVideo = async (req, res) => {
    const {
        params: { id },
        body: { title, description }
    } = req;

    try {
        await Video.findOneAndUpdate( { _id : id }, { title, description } );
        res.redirect(routes.videoDetail(id));
    } catch(error) {
        console.log(error);
        res.redirect(routes.home);
    }

}

export const deleteVideo = async(req, res) => {
    const {
        params: {id}
    } = req;

    try {
        await Video.findOneAndRemove({_id: id});
    } catch(error) {
        console.log(error);
    }
    res.redirect(routes.home);
}