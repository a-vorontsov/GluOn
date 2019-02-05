const request = require("superagent");
import {
  AccessToken,
  User,
  Sticker
} from './models';

interface ResourceFilter {
  where?: any;
  order?: any;
  include?: any;
  skip?: number;
  limit?: number;
  fields?: any;
}

var token: AccessToken = (function () {
  var tokenString;
  const storages = [
    window.localStorage,
    window.sessionStorage,
  ];
  storages.forEach(storage => {
    var item = storage.getItem("user:token");
    if (item) {
      tokenString = item;
    }
  });
  if (tokenString) {
    return JSON.parse(tokenString);
  } else {
    return null;
  }
})();

export function logOn(accessToken: AccessToken, persist=false) {
  if (!accessToken) {
    return;
  }
  var storage;
  if (persist) {
    storage = window.localStorage;
  } else {
    storage = window.sessionStorage;
  }
  const tokenString = JSON.stringify(accessToken);
  storage.setItem("user:token", tokenString);
  token = accessToken;
}

export function logOut() {
  token = null;
  var storages = [
    window.localStorage,
    window.sessionStorage,
  ];
  storages.forEach(storage => storage.clear());
}

export function isAuthenticated() {
  return (token !== null);
}

export class Resource<T> {
  _baseURI: string;
  constructor(pathname: string) {
    if (pathname.startsWith("/")) {
      this._baseURI = `${pathname}`;
    } else {
      this._baseURI = `/${pathname}`;
    }
  }
  async create(payload: T) {
    const req = request
      .post(this._baseURI)
      .set("Accept", "application/json")
      .set("Content-type", "application/json");
    if (token) {
      req.set("Authorization", token.id);
    }
    const response = await req.send(payload);
    return response;
  }
  async find(filter?: ResourceFilter) {
    const req = request
      .get(this._baseURI)
      .set("Accept", "application/json");
    if (token) {
      req.set("Authorization", token.id);
    }
    if (filter) {
      req.query({filter});
    }
    const response = await req;
    return response.body;
  }
  async findById(id: string|number, filter?: ResourceFilter) {
    if (/^\s*$/.test(id.toString())) {
      throw new Error("id must not be empty");
    }
    const req = request
      .get(this._baseURI + "/" + id)
      .set("Accept", "application/json");
    if (token) {
      req.set("Authorization", token.id);
    }
    if (filter) {
      req.query({filter});
    }
    const response = await req;
    return response.body;
  }
  async findOne(filter?: ResourceFilter) {
    const req = request
      .get(this._baseURI)
      .set("Accept", "application/json");
    if (token) {
      req.set("Authorization", token.id);
    }
    if (filter) {
      req.query({filter});
    }
    const response = await req;
    return response.body;
  }
  async destroyById(id: string|number) {
    const req = request
      .delete(this._baseURI + "/" + id)
      .set("Accept", "application/json");
    if (token) {
      req.set("Authorization", token.id);
    }
    await req;
    return null;
  }
  async updateById(id: string|number, payload: Partial<T>) {
    const req = request
      .patch(this._baseURI + "/" + id)
      .set("Accept", "application/json")
      .set("Content-type", "application/json");
    if (token) {
      req.set("Authorization", token.id);
    }
    const response = await req.send(payload);
    return response.body;
  }
  async updateAll(where: object|null, payload: Partial<T>) {
    const req = request
      .post(this._baseURI + "/update")
      .set("Accept", "application/json")
      .set("Content-type", "application/json");
      if (token) {
        req.set("Authorization", token.id);
      }
      if (where) {
        req.query({where});
      }
      const response = await req.send(payload);
      const body = response.body;
      return body.count || 0;
  }
  async count(whereFilter?: any) {
    const req = request
      .get(this._baseURI + "/count")
      .set("Accept", "application/json");
    if (token) {
      req.set("Authorization", token.id);
    }
    if (whereFilter) {
      req.query(whereFilter);
    }
    const response = await req;
    const body = response.body;
    return body.count || 0;
  }
  async destroyAll(where?: object) {
    const req = request
      .delete(this._baseURI)
      .set("Accept", "application/json");
    if (token) {
      req.set("Authorization", token.id);
    }
    if (where) {
      req.query({
        where,
      });
    }
    await req;
    return null;
  }
}

export class StickerResource extends Resource<Sticker> {
  constructor() {
    super("/stickers");
  }
}

export class UserResource extends Resource<User> {
  constructor() {
    super("/users");
  }
  async login(payload: any, options = {persist: false}): Promise<AccessToken> {
    const req = request
      .post(this._baseURI + "/login")
      .set("Accept", "application/json")
      .set("Content-type", "application/json");
    const response = await req.send(payload);
    const accessToken = await response.body;
    logOn(accessToken, options.persist);
    return accessToken;
  }
}

export class OrganisationResource extends Resource<any> {
  constructor() {
    super("/orgs");
  }
}
