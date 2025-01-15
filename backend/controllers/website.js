import Website from '../models/Website.js';
import axios from 'axios';

function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  );
}

export const createwebsite = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ status: false, message: "URL is required" });
  }

  if (!validateUrl(url)) {
    return res.status(422).json({ status: false, message: "Invalid URL" });
  }

  const {userId} = req.body;
  const user = req.user;
  const existingWebsite = await Website.findOne({ url, userId });
  if (existingWebsite) {
    return res.status(409).json({ status: false, message: "Website already exists" });
  }

  const response = await axios.get(url).catch(() => null);
  if (!response || response.status !== 200) {
    return res.status(422).json({ status: false, message: `Website ${url} is not active` });
  }

  const newWebsite = new Website({ url, userId, isActive: true });
  await newWebsite.save();

  return res.status(201).json({ status: true, message: "Website created", data: newWebsite });
};

export const deleteWebsite = async (req, res) => {
  const { webId } = req.params;
  console.log(webId);
  if (!webId) {
    return res.status(400).json({ status: false, message: "Website ID is required" });
  }

  await Website.deleteOne({ _id: webId });
  return res.status(200).json({ status: true, message: "Website deleted" });
};

export const getAllWebsites = async (req, res) => {
  const{userId} = req.body;
  const websites = await Website.find( {userId }).populate('userId', ['name', 'email']);
  return res.status(200).json({ status: true, data: websites });
};
