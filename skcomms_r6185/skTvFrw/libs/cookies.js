if(typeof window == 'undefined'){
	if(typeof skFn == 'undefined'){
		skFn = {};
	}
}
else if(typeof window.skFn == 'undefined'){
	window.skFn = {};
}

skFn.cookie = (function() {
  var EPOCH = 'Thu, 01-Jan-1970 00:00:01 GMT',
      RATIO = 1000 * 60 * 60 * 24,
      KEYS = ['expires', 'path', 'domain'],
      esc = escape, un = unescape, doc = document,
      me; 

  var get_now = function() {
    var r = new Date();
    r.setTime(r.getTime());
    return r;
  }

  /*
   * Convert the given key/value pair to a cookie.
   *
   * This method is private.
   */
  var cookify = function(c_key, c_val /*, opt */) {
     var i, key, val, r = [],
         opt = (arguments.length > 2) ? arguments[2] : {};

    // add key and value
    r.push(c_key + '=' + c_val);
	////alert("cookify:"+c_key + '=' + c_val);
    //r.push(c_key + '=' + esc(c_val));

    // iterate over option keys and check each one
    for (i = 0; i < KEYS.length; i++) {
      key = KEYS[i];
      if (val = opt[key])
        r.push(key + '=' + val);
    }

    // append secure (if specified)
    if (opt.secure)
      r.push('secure');

    // build and return result string
    return r.join('; ');
  }

  /*
   * Check to see if cookies are enabled.
   *
   * This method is private.
   */
  var alive = function() {
    var k = '__EC_TEST__', 
        v = new Date();

    // generate test value
    v = v.toGMTString();

    // set test value
    this.set(k, v);

    // return cookie test
    this.enabled = (this.remove(k) == v);
    return this.enabled;
  }

  // public methods
  // build return object
  me = {
    /*
     * Set a cookie value.
     *
     * Examples:
     *
     *   // simplest-case
     *   EasyCookie.set('test_cookie', 'test_value');
     *
     *   // more complex example
     *   EasyCookie.set('test_cookie', 'test_value', {
     *     // expires in 13 days
     *     expires: 13,
     *
     *     // restrict to given domain
     *     domain: 'foo.example.com',
     *
     *     // restrict to given path
     *     path: '/some/path',
     *
     *     // secure cookie only
     *     secure: true
     *   });
     *
     */

    set: function(key, val , opt) {
      var opt = (arguments.length > 2) ? arguments[2] : {}, 
          now = get_now(),
          expire_at,
          cfg = {};

      // if expires is set, convert it from days to milliseconds
      if (opt.expires) {
        opt.expires *= RATIO;

        // set cookie expiration date
        cfg.expires = new Date(now.getTime() + opt.expires);
        cfg.expires = cfg.expires.toGMTString();
      }
		////alert("opt.expires ="+ opt.expires);
      // set remaining keys
      var keys = ['path', 'domain', 'secure'];
      for (i = 0; i < keys.length; i++)
        if (opt[keys[i]]){
		  
          cfg[keys[i]] = opt[keys[i]];
		  ////alert(keys[i] +" = "+cfg[keys[i]]);
		}
	  ////alert(key+" = "+this.has(key));
      var r = cookify(key, val, cfg);
//	  ////alert("cookie="+document.cookie);
      doc.cookie = r;

      return val;
    },

    /*
     * Check to see if the given cookie exists.
     *
     * Example:
     *
     *   val = EasyCookie.get('test_cookie');
     *
     */
    has: function(key) {
      key = key;

      var c = doc.cookie,
          ofs = (c.indexOf('; '+ key + '=') == -1) ? c.indexOf(key + '=') : c.indexOf('; '+ key + '='),
          len = ofs + key.length + 1,
          sub = c.substring(0, key.length);

      // check to see if key exists
      return ((!ofs && key != sub) || ofs < 0) ? false : true;
    },
	//escaped 옵션 parameter 추가
	// 2011년 11월 15일 화요일 오후 10:11:27
	// @Soonyoung Park
    get: function(key, isEscaped) {
      key = key;
	  
      var c = doc.cookie;
      if(c.indexOf('; '+ key + '=') == -1){
		var ofs = c.indexOf(key + '=');
	  }else{
		var ofs = c.indexOf('; '+ key + '=') + key.length + 1;
	  }


      var    len = ofs + key.length + 1,
          sub = c.substring(0, key.length),
          end;
		//alert("skFn.cookie.get\n\n"+document.cookie+"\n\n\n"+key+"="+ofs);
      // check to see if key exists
      if ((!ofs && key != sub) || ofs < 0)
        return null;

      // grab end of value
      end = c.indexOf(';', len);
      if (end < 0) 
        end = c.length;

      // return unescaped value
	  //decode 안하고 넘길 수 있게 수정 2011년 11월 15일 화요일 오후 2:58:34
	  //@Soonyoung Park
	  if(isEscaped == true){
		  return c.substring(len, end);
	  }else{
		return decodeURIComponent(c.substring(len, end));
	  }
    },

    /**
     * Remove a preset cookie.  If the cookie is already set, then
     * return the value of the cookie.
     *
     * Example:
     *
     *   old_val = EasyCookie.remove('test_cookie');
     *
    **/
    remove: function(k) {
	  var opt = {};
      opt.expires = -1;
	  opt.path = '/';
	  this.set(k, '', opt);
    },

    /*
     * Get a list of cookie names.
     *
     * Example:
     *
     *   // get all cookie names
     *   cookie_keys = EasyCookie.keys();
     *
     */
    keys: function() {
      var c = doc.cookie, 
          ps = c.split('; '),
          i, p, r = [];

      // iterate over each key=val pair and grab the key
      for (i = 0; i < ps.length; i++) {
        p = ps[i].split('=');
        r.push(un(p[0]));
      }

      // return results
      return r;
    },
  
    /*
     * Get an array of all cookie key/value pairs.
     *
     * Example:
     *
     *   // get all cookies
     *   all_cookies = EasyCookie.all();
     *
     */
    all: function() {
      var c = doc.cookie, 
          ps = c.split('; '),
          i, p, r = [];

      // iterate over each key=val pair and grab the key
      for (i = 0; i < ps.length; i++) {
        p = ps[i].split('=');
        r.push([un(p[0]), un(p[1])]);
      }

      // return results
      return r;
    },

    /* 
     * Version of EasyCookie
     */
    version: '0.2.1',

    /*
     * Are cookies enabled?
     *
     * Example:
     *
     *   have_cookies = EasyCookie.enabled
     *
     */
    enabled: true
  };

  // return self
  return me;
}());
