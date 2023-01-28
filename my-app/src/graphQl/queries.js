import {
  actionPending,
  actionFulfilled,
  actionRejected,
  actionCreatePost,
} from "../actions/actions";
import { actionAuthLogin } from "../actions/actions";
import { backendURL } from "../backendurl";

//actionPromise:
const actionPromise = (name, promise) => async (dispatch) => {
  dispatch(actionPending(name));
  try {
    const payload = await promise;
    dispatch(actionFulfilled(name, payload));
    return payload;
  } catch (error) {
    dispatch(actionRejected(name, error));
  }
};

//getGql:
const getGql = (url) => (query, variables) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(localStorage.authToken
        ? { Authorization: "Bearer " + localStorage.authToken }
        : {}),
    },
    body: JSON.stringify({ query, variables }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.data) {
        return Object.values(data.data)[0];
      } else throw new Error(JSON.stringify(data.errors));
    });

const url = "http://hipstagram.node.ed.asmer.org.ua/";
const gql = getGql(url + "graphql");

//запросы
//регистрация
export const actionRegistration = (login, password) =>
  actionPromise(
    "registration",
    gql(
      `mutation register($login: String!, $password: String!){
    createUser (login: $login, password: $password) {
        _id 
        login
    }
}`,
      { login, password }
    )
  );

export const actionFullRegister = (login, password) => async (dispatch) => {
  let userReg = await dispatch(actionRegistration(login, password));
  if (userReg) {
    dispatch(actionFullLogin(login, password));
  }
};

//логинизация
const actionLogin = (login, password) =>
  actionPromise(
    "actionLogin",
    gql(
      `query log($login: String!, $password: String!) {
    login(login: $login, password: $password)
    }`,
      { login: login, password: password }
    )
  );

export const actionFullLogin = (login, password) => async (dispatch) => {
  const token = await dispatch(actionLogin(login, password));

  if (token) {
    await dispatch(actionAuthLogin(token));
    await dispatch(fullActionInfoAboutUser());
  } else alert("Пароль неверный или введён повторно");
};

//информация о пользователе
export const actionInfoAboutUser = (_id) =>
  actionPromise(
    "actionInfoAboutUser",
    gql(
      `query InfoAboutUser ($q:String) {
    UserFindOne (query: $q){
      _id
      login
      nick 
      avatar {
        url
      }
      followers {
        _id
        nick 
        avatar {
          url
        }
      }
      following {
        _id
        nick 
        avatar {
          url
        }
      }
    }
  }`,
      { q: JSON.stringify([{ _id: _id }]) }
    )
  );

export const fullActionInfoAboutUser = () => async (dispatch, getState) => {
  const ID = getState().auth?.payload?.sub?.id;
  await dispatch(actionInfoAboutUser(ID));
};

//создание поста пользователем
const actionCreatePostt = (text, imagesArr) =>
  actionPromise(
    "actionCreatePost",
    gql(
      `mutation createPost ($post:PostInput){
    PostUpsert(post:$post){
      text
      images {
        _id
        url
      }
    }
  }`,
      { post: { text: text, images: imagesArr } }
    )
  );

export const actionFullCreatePost =
  (text, imagesArr) => async (dispatch, getState) => {
    const imagesArr = getState().promise?.uploadFile?.payload || [];
    await dispatch(actionCreatePostt(text, imagesArr));
    if (imagesArr) {
      await dispatch(actionCreatePost(text, imagesArr));
    }
  };

//один пост пользователя
export const actionOnePost = (_id) =>
  actionPromise(
    "actionOnePost",
    gql(
      `query OnePost ($q:String) {
    PostFindOne (query: $q){
      _id
      createdAt
      text
      images {
        url
      }
      comments {
        _id
        text
        owner {
          _id
          nick 
          avatar {
            url
          }
        }
      }
      owner {
        _id
        nick 
        avatar {
          url
        }
      }
    }
  }`,
      { q: JSON.stringify([{ _id: _id }]) }
    )
  );

export const fullActionOnePost = () => async (dispatch, getState) => {
  const ID = getState().auth?.payload?.sub?.id;
  await dispatch(actionInfoAboutUser(ID));
  await dispatch(actionOnePost(ID));
};

//все посты пользователя
export const actionAllPosts = (id) =>
  actionPromise(
    "actionAllPosts",
    gql(
      `query posts ($id:String){
    PostFind(query:$id) {
      _id
      text
      owner {
        _id
        login
      }
      images {
        _id
        url
      } 
    }
  }`,
      {
        id: JSON.stringify([
          { ___owner: id },
          { sort: [{ _id: -1 }], skip: [100], limit: [10] },
        ]),
      }
    )
  );

export const fullActionAllPosts = () => async (dispatch, getState) => {
  const ID = getState().auth?.payload?.sub?.id;
  await dispatch(actionAllPosts(ID));
};

//комментарий добавить
export const actionCreateComment = (_id) =>
  actionPromise(
    "actionCreateComment",
    gql(
      `mutation createComment ($comment:CommentInput){
    CommentUpsert(comment:$comment){
      _id 
      post {
        _id
        owner {
          _id
          nick 
          avatar {
            url
          }
        }
      }
      owner {
        _id
        nick 
        avatar {
          url
        }
      }
    }
  }`,
      { comment: { _id: _id } }
    )
  );

//подписчики пользователя
export const actionFollowers = (_id) =>
  actionPromise(
    "actionFollowers",
    gql(
      `query followers($q:String){
    UserFind(query: $q){
      followers {
        _id
        nick 
        avatar {
          url
        }
      }
    }
  }`,
      { q: JSON.stringify([{ _id: _id }]) }
    )
  );

export const fullActionFollowers = () => async (dispatch, getState) => {
  const ID = getState().auth?.payload?.sub?.id;
  await dispatch(actionFollowers(ID));
};

//на кого подписан пользователь
export const actionFollowing = (_id) =>
  actionPromise(
    "actionFollowing",
    gql(
      `query following($q:String){
    UserFind(query: $q){
      following {
        _id
        nick 
        avatar {
          url
        }
      }
    }
  }`,
      { q: JSON.stringify([{ _id: _id }]) }
    )
  );

export const fullActionFollowing = () => async (dispatch, getState) => {
  const ID = getState().auth?.payload?.sub?.id;
  await dispatch(actionFollowing(ID));
};

//загрузки фото
export const actionUploadFile = (file) => {
  let fd = new FormData();
  fd.append("photo", file);
  return actionPromise(
    "uploadFile",
    fetch(`${backendURL}upload`, {
      method: "POST",
      headers: localStorage.authToken
        ? { Authorization: "Bearer " + localStorage.authToken }
        : {},
      body: fd,
    }).then((res) => res.json())
  );
};

export const actionUploadFiles = (files) => {
  let result = [];
  for (let i = 0; i < files.length; i++) {
    let fd = new FormData();
    fd.append("photo", files[i]);
    let oneItem = fetch(`${backendURL}upload`, {
      method: "POST",
      headers: localStorage.authToken
        ? { Authorization: "Bearer " + localStorage.authToken }
        : {},
      body: fd,
    });
    result.push(oneItem);
  }
  return actionPromise(
    "uploadFiles",
    Promise.all(result)
      .then((res) => res.map((i) => i.json()))
      .then((res) => Promise.all(res))
  );
};

export const fullActionUploadFiles = (files) => async (dispatch) => {
  await dispatch(actionUploadFiles(files));
  await dispatch(actionCreatePost());
};
