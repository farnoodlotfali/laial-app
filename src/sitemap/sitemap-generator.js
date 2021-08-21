require("babel-register")({
  presets: ["es2015", "react"],
});
//for run : open terminal and npm run sitemap
const router = require("./sitemap-routes").default;
const Sitemap = require("react-router-sitemap").default;
const AWSAmplify = require("aws-amplify");
const Amplify = AWSAmplify.default;
const API = AWSAmplify.API;
const axios = require("../axios/axios").default;

Amplify.configure({
  API: {
    endpoints: [
      {
        name: "posts",
        endpoint: "https://nejat.safine.co/api",
        // region: config.apiGateway.REGION,
      },
    ],
  },
});
let PostsModels = [];
let BlocksModels = [];
let PagesModels = [];
let PersonsModels = [];
let paramsConfig;

const getAllSlug = async (page, url, array) => {
  if (!page) {
    paramsConfig = {
      "/song/:slug": PostsModels,
      "/list/:slug": BlocksModels,
      "/:slug": PagesModels,
      "/person/:slug": PersonsModels,
    };
    // console.log(paramsConfig);
    return new Sitemap(router)
      .applyParams(paramsConfig)
      .build("https://safine.co")
      .save("./public/sitemap.xml");
  }
  try {
    const res = await API.get("posts", `/sitemap/${url}?page=${page}`);

    for (var i = 0; i < res.results.length; i++) {
      array.push({ slug: res.results[i].slug });
    }

    getAllSlug(res.next ? page + 1 : null, url, array);
  } catch (e) {
    console.log(e);
  }
};

const generateSitemap = async () => {
  try {
    PostsModelsFunc();
    BlocksModelsFunc();
    PagesModelsFunc();
    PersonsModelsFunc();
  } catch (e) {
    console.log(e);
  }
};

const PostsModelsFunc = async () => {
  const res = await API.get("posts", "/sitemap/PostsModels");

  for (var i = 0; i < res.results.length; i++) {
    PostsModels.push({ slug: res.results[i].slug });
  }
  getAllSlug(res.next ? 2 : null, "PostsModels", PostsModels);
};
const BlocksModelsFunc = async () => {
  const res = await API.get("posts", "/sitemap/BlocksModels");

  for (var i = 0; i < res.results.length; i++) {
    BlocksModels.push({ slug: res.results[i].slug });
  }
  getAllSlug(res.next ? 2 : null, "BlocksModels", BlocksModels);
};
const PagesModelsFunc = async () => {
  const res = await API.get("posts", "/sitemap/PagesModels");

  for (var i = 0; i < res.results.length; i++) {
    PagesModels.push({ slug: res.results[i].slug });
  }
  getAllSlug(res.next ? 2 : null, "PagesModels", PagesModels);
};
const PersonsModelsFunc = async () => {
  const res = await API.get("posts", "/sitemap/PersonsModels");

  for (var i = 0; i < res.results.length; i++) {
    PersonsModels.push({ slug: res.results[i].slug });
  }
  getAllSlug(res.next ? 2 : null, "PersonsModels", PersonsModels);
};

generateSitemap();

// https://nejat.safine.co/api/sitemap/PostsModels
// https://nejat.safine.co/api/sitemap/BlocksModels
// https://nejat.safine.co/api/sitemap/PagesModels
// https://nejat.safine.co/api/sitemap/PersonsModels
