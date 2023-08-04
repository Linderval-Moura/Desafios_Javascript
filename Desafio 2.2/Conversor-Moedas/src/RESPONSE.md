Response: class {
      static error() {
        const relevantRealm = { settingsObject: {} };
        const responseObject = new Response();
        responseObject[kState] = makeNetworkError();
        responseObject[kRealm] = relevantRealm;
        responseObject[kHeaders][kHeadersList] = responseObject[kState].headersList;
        responseObject[kHeaders][kGuard] = "immutable";
        responseObject[kHeaders][kRealm] = relevantRealm;
        return responseObject;
      }
      static json(data = void 0, init = {}) {
        webidl.argumentLengthCheck(arguments, 1, { header: "Response.json" });
        if (init !== null) {
          init = webidl.converters.ResponseInit(init);
        }
        const bytes = new TextEncoder("utf-8").encode(serializeJavascriptValueToJSONString(data));
        const body = extractBody(bytes);
        const relevantRealm = { settingsObject: {} };
        const responseObject = new Response();
        responseObject[kRealm] = relevantRealm;
        responseObject[kHeaders][kGuard] = "response";
        responseObject[kHeaders][kRealm] = relevantRealm;
        initializeResponse(responseObject, init, { body: body[0], type: "application/json" });
        return responseObject;
      }
      static redirect(url, status = 302) {
        const relevantRealm = { settingsObject: {} };
        webidl.argumentLengthCheck(arguments, 1, { header: "Response.redirect" });
        url = webidl.converters.USVString(url);
        status = webidl.converters["unsigned short"](status);
        let parsedURL;
        try {
          parsedURL = new URL(url, getGlobalOrigin());
        } catch (err) {
          throw Object.assign(new TypeError("Failed to parse URL from 
" + url), {
            cause: err
          });
        }
        if (!redirectStatus.includes(status)) {
          throw new RangeError("Invalid status code " + status);      
        }
        const responseObject = new Response();
        responseObject[kRealm] = relevantRealm;
        responseObject[kHeaders][kGuard] = "immutable";
        responseObject[kHeaders][kRealm] = relevantRealm;
        responseObject[kState].status = status;
        const value = isomorphicEncode(URLSerializer(parsedURL));     
        responseObject[kState].headersList.append("location", value); 
        return responseObject;
      }
      constructor(body = null, init = {}) {
        if (body !== null) {
          body = webidl.converters.BodyInit(body);
        }
        init = webidl.converters.ResponseInit(init);
        this[kRealm] = { settingsObject: {} };
        this[kState] = makeResponse({});
        this[kHeaders] = new Headers();
        this[kHeaders][kGuard] = "response";
        this[kHeaders][kHeadersList] = this[kState].headersList;      
        this[kHeaders][kRealm] = this[kRealm];
        let bodyWithType = null;
        if (body != null) {
          const [extractedBody, type] = extractBody(body);
          bodyWithType = { body: extractedBody, type };
        }
        initializeResponse(this, init, bodyWithType);
      }
      get type() {
        webidl.brandCheck(this, Response);
        return this[kState].type;
      }
      get url() {
        webidl.brandCheck(this, Response);
        const urlList = this[kState].urlList;
        const url = urlList[urlList.length - 1] ?? null;
        if (url === null) {
          return "";
        }
        return URLSerializer(url, true);
      }
      get redirected() {
        webidl.brandCheck(this, Response);
        return this[kState].urlList.length > 1;
      }
      get status() {
        webidl.brandCheck(this, Response);
        return this[kState].status;
      }
      get ok() {
        webidl.brandCheck(this, Response);
        return this[kState].status >= 200 && this[kState].status <= 299;
      }
      get statusText() {
        webidl.brandCheck(this, Response);
        return this[kState].statusText;
      }
      get headers() {
        webidl.brandCheck(this, Response);
        return this[kHeaders];
      }
      get body() {
        webidl.brandCheck(this, Response);
        return this[kState].body ? this[kState].body.stream : null;   
      }
      get bodyUsed() {
        webidl.brandCheck(this, Response);
        return !!this[kState].body && util.isDisturbed(this[kState].body.stream);
      }
      clone() {
        webidl.brandCheck(this, Response);
        if (this.bodyUsed || this.body && this.body.locked) {
          throw webidl.errors.exception({
            header: "Response.clone",
            message: "Body has already been consumed."
          });
        }
        const clonedResponse = cloneResponse(this[kState]);
        const clonedResponseObject = new Response();
        clonedResponseObject[kState] = clonedResponse;
        clonedResponseObject[kRealm] = this[kRealm];
        clonedResponseObject[kHeaders][kHeadersList] = clonedResponse.headersList;
        clonedResponseObject[kHeaders][kGuard] = this[kHeaders][kGuard];
        clonedResponseObject[kHeaders][kRealm] = this[kHeaders][kRealm];
        return clonedResponseObject;
      }
    }