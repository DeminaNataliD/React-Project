import { PageRegistration } from "../pages/pageRegistration";
import { PageUsersPage } from "../pages/pageUsersPage";
import { PageOnePost } from "../pages/pageOnePost";
import { PageFollowers } from "../pages/pageFollowers";
import { PageCreateComment } from "../pages/pageCreateComment";
import { PageCreatePost } from "../pages/pageCreatePost";
import { PageLogReg } from "../pages/pageLogReg";
import { PageLogin } from "../pages/pageLogin";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PageFollowings } from "../pages/pageFollowings";
import { PageComments } from "../pages/pageComments";
import { PageAllPosts } from "../pages/pageAllPosts";
import { PageSettings } from "../pages/pageSettings";

export const AllRoutes = () => {
  return (
    <Router>
      <Route path="/" exact component={PageLogReg} />
      <Route path="/pageregistration" component={PageRegistration} />
      <Route path="/pagelogin" component={PageLogin} />
      <Route path="/pagecreatepost" component={PageCreatePost} />
      <Route path="/pageonepost" component={PageOnePost} />
      <Route path="/pageallposts" component={PageAllPosts} />
      <Route path="/pageuserspage" component={PageUsersPage} />
      <Route path="/pagecreatecomment" component={PageCreateComment} />
      <Route path="/pagecomments" component={PageComments} />
      <Route path="/pagefollowings" component={PageFollowings} />
      <Route path="/pagefollowers" component={PageFollowers} />
      <Route path="/pagesettings" component={PageSettings} />
    </Router>
  );
};
