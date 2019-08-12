(function() {
    var Parser,
      slice = [].slice;
  
    Parser = (function() {
      var array_keys, array_values, htmlspecialchars, pL, preg_quote, str_replace, trim, ucfirst;
  
      ucfirst = function(str) {
        return (str.charAt(0)).toUpperCase() + str.substring(1);
      };
  
      preg_quote = function(str) {
        return str.replace(/[-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
      };
  
      pL = 'A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC';
  
      str_replace = function(search, replace, str) {
        var i, j, l, len, len1, val;
        if (search instanceof Array) {
          if (replace instanceof Array) {
            for (i = j = 0, len = search.length; j < len; i = ++j) {
              val = search[i];
              str = str_replace(val, replace[i], str);
            }
          } else {
            for (l = 0, len1 = search.length; l < len1; l++) {
              val = search[l];
              str = str_replace(val, replace, str);
            }
          }
        } else {
          search = preg_quote(search);
          str = str.replace(new RegExp(search, 'g'), replace.replace(/\$/g, '$$$$'));
        }
        return str;
      };
  
      htmlspecialchars = function(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      };
  
      trim = function(str, ch) {
        var c, i, j, ref, search;
        if (ch == null) {
          ch = null;
        }
        if (ch != null) {
          search = '';
          for (i = j = 0, ref = ch.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
            c = ch[i];
            c = preg_quote(c);
            search += c;
          }
          search = '[' + search + ']*';
          return str.replace(new RegExp('^' + search), '').replace(new RegExp(search + '$'), '');
        } else {
          return str.replace(/^\s*/, '').replace(/\s*$/, '');
        }
      };
  
      array_keys = function(arr) {
        var _, j, k, len, result;
        result = [];
        if (arr instanceof Array) {
          for (k = j = 0, len = arr.length; j < len; k = ++j) {
            _ = arr[k];
            result.push(k);
          }
        } else {
          for (k in arr) {
            result.push(k);
          }
        }
        return result;
      };
  
      array_values = function(arr) {
        var _, j, len, result, v;
        result = [];
        if (arr instanceof Array) {
          for (j = 0, len = arr.length; j < len; j++) {
            v = arr[j];
            result.push(v);
          }
        } else {
          for (_ in arr) {
            v = arr[_];
            result.push(v);
          }
        }
        return result;
      };
  
      function Parser() {
        this.commonWhiteList = 'kbd|b|i|strong|em|sup|sub|br|code|del|a|hr|small';
        this.blockHtmlTags = 'p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|address|form|fieldset|iframe|hr|legend|article|section|nav|aside|hgroup|header|footer|figcaption|svg|script|noscript';
        this.specialWhiteList = {
          table: 'table|tbody|thead|tfoot|tr|td|th'
        };
        this.hooks = {};
        this.html = false;
        this.line = false;
        this.blockParsers = [['code', 10], ['shtml', 20], ['pre', 30], ['ahtml', 40], ['list', 50], ['math', 60], ['html', 70], ['footnote', 80], ['definition', 90], ['quote', 100], ['table', 110], ['sh', 120], ['mh', 130], ['hr', 140], ['default', 9999]];
        this.parsers = {};
      }
  
      Parser.prototype.makeHtml = function(text) {
        var html, j, len, name, parser, ref;
        this.footnotes = [];
        this.definitions = {};
        this.holders = {};
        this.uniqid = (Math.ceil(Math.random() * 10000000)) + (Math.ceil(Math.random() * 10000000));
        this.id = 0;
        this.blockParsers.sort(function(a, b) {
          if (a[1] < b[1]) {
            return -1;
          } else {
            return 1;
          }
        });
        ref = this.blockParsers;
        for (j = 0, len = ref.length; j < len; j++) {
          parser = ref[j];
          name = parser[0];
          if (parser[2] !== void 0) {
            this.parsers[name] = parser[2];
          } else {
            this.parsers[name] = this['parseBlock' + (ucfirst(name))].bind(this);
          }
        }
        text = this.initText(text);
        html = this.parse(text);
        html = this.makeFootnotes(html);
        html = this.optimizeLines(html);
        return this.call('makeHtml', html);
      };
  
      Parser.prototype.enableHtml = function(html1) {
        this.html = html1 != null ? html1 : true;
      };
  
      Parser.prototype.enableLine = function(line1) {
        this.line = line1 != null ? line1 : true;
      };
  
      Parser.prototype.hook = function(type, cb) {
        if (this.hooks[type] == null) {
          this.hooks[type] = [];
        }
        return this.hooks[type].push(cb);
      };
  
      Parser.prototype.makeHolder = function(str) {
        var key;
        key = "|\r" + this.uniqid + this.id + "\r|";
        this.id += 1;
        this.holders[key] = str;
        return key;
      };
  
      Parser.prototype.initText = function(text) {
        return text.replace(/\t/g, '    ').replace(/\r/g, '').replace(/(\u000A|\u000D|\u2028|\u2029)/g, "\n");
      };
  
      Parser.prototype.makeFootnotes = function(html) {
        var index, val;
        if (this.footnotes.length > 0) {
          html += '<div class="footnotes"><hr><ol>';
          index = 1;
          while (val = this.footnotes.shift()) {
            if (typeof val === 'string') {
              val += " <a href=\"#fnref-" + index + "\" class=\"footnote-backref\">&#8617;</a>";
            } else {
              val[val.length - 1] += " <a href=\"#fnref-" + index + "\" class=\"footnote-backref\">&#8617;</a>";
              val = val.length > 1 ? this.parse(val.join("\n")) : this.parseInline(val[0]);
            }
            html += "<li id=\"fn-" + index + "\">" + val + "</li>";
            index += 1;
          }
          html += '</ol></div>';
        }
        return html;
      };
  
      Parser.prototype.parse = function(text, inline, offset) {
        var block, blocks, end, extract, html, j, len, lines, method, result, start, type, value;
        if (inline == null) {
          inline = false;
        }
        if (offset == null) {
          offset = 0;
        }
        lines = [];
        blocks = this.parseBlock(text, lines);
        html = '';
        if (inline && blocks.length === 1 && blocks[0][0] === 'normal') {
          blocks[0][3] = true;
        }
        for (j = 0, len = blocks.length; j < len; j++) {
          block = blocks[j];
          type = block[0], start = block[1], end = block[2], value = block[3];
          extract = lines.slice(start, end + 1);
          method = 'parse' + ucfirst(type);
          extract = this.call('before' + ucfirst(method), extract, value);
          result = this[method](extract, value, start + offset, end + offset);
          result = this.call('after' + ucfirst(method), result, value);
          html += result;
        }
        return html;
      };
  
      Parser.prototype.call = function() {
        var args, callback, j, len, ref, type, value;
        type = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
        value = args[0];
        if (this.hooks[type] == null) {
          return value;
        }
        ref = this.hooks[type];
        for (j = 0, len = ref.length; j < len; j++) {
          callback = ref[j];
          value = callback.apply(this, args);
          args[0] = value;
        }
        return value;
      };
  
      Parser.prototype.releaseHolder = function(text, clearHolders) {
        var deep;
        if (clearHolders == null) {
          clearHolders = true;
        }
        deep = 0;
        while ((text.indexOf("\r")) >= 0 && deep < 10) {
          text = str_replace(array_keys(this.holders), array_values(this.holders), text);
          deep += 1;
        }
        if (clearHolders) {
          this.holders = {};
        }
        return text;
      };
  
      Parser.prototype.markLine = function(start, end) {
        if (end == null) {
          end = -1;
        }
        if (this.line) {
          end = end < 0 ? start : end;
          return '<span class="line" data-start="' + start + '" data-end="' + end + '" data-id="' + this.uniqid + '"></span>';
        }
        return '';
      };
  
      Parser.prototype.markLines = function(lines, start) {
        var i;
        i = -1;
        if (this.line) {
          return lines.map((function(_this) {
            return function(line) {
              i += 1;
              return (_this.markLine(start + i)) + line;
            };
          })(this));
        } else {
          return lines;
        }
      };
  
      Parser.prototype.optimizeLines = function(html) {
        var last, regex;
        last = 0;
        regex = new RegExp("class=\"line\" data\\-start=\"([0-9]+)\" data\\-end=\"([0-9]+)\" (data\\-id=\"" + this.uniqid + "\")", 'g');
        if (this.line) {
          return html.replace(regex, function() {
            var matches, replace;
            matches = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            if (last !== parseInt(matches[1])) {
              replace = 'class="line" data-start="' + last + '" data-start-original="' + matches[1] + '" data-end="' + matches[2] + '" ' + matches[3];
            } else {
              replace = matches[0];
            }
            last = 1 + parseInt(matches[2]);
            return replace;
          });
        } else {
          return html;
        }
      };
  
      Parser.prototype.parseInline = function(text, whiteList, clearHolders, enableAutoLink) {
        var regex;
        if (whiteList == null) {
          whiteList = '';
        }
        if (clearHolders == null) {
          clearHolders = true;
        }
        if (enableAutoLink == null) {
          enableAutoLink = true;
        }
        text = this.call('beforeParseInline', text);
        text = text.replace(/(^|[^\\])(`+)(.+?)\2/mg, (function(_this) {
          return function() {
            var matches;
            matches = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return matches[1] + _this.makeHolder('<code>' + (htmlspecialchars(matches[3])) + '</code>');
          };
        })(this));
        text = text.replace(/(^|[^\\])(\$+)(.+?)\2/mg, (function(_this) {
          return function() {
            var matches;
            matches = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return matches[1] + _this.makeHolder(matches[2] + (htmlspecialchars(matches[3])) + matches[2]);
          };
        })(this));
        text = text.replace(/\\(.)/g, (function(_this) {
          return function() {
            var escaped, matches;
            matches = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            escaped = htmlspecialchars(matches[1]);
            escaped = escaped.replace(/\$/g, '&dollar;');
            return _this.makeHolder(escaped);
          };
        })(this));
        text = text.replace(/<(https?:\/\/.+)>/ig, (function(_this) {
          return function() {
            var link, matches, url;
            matches = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            url = _this.cleanUrl(matches[1]);
            link = _this.call('parseLink', matches[1]);
            return _this.makeHolder("<a href=\"" + url + "\">" + link + "</a>");
          };
        })(this));
        text = text.replace(/<(\/?)([a-z0-9-]+)(\s+[^>]*)?>/ig, (function(_this) {
          return function() {
            var matches;
            matches = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            if (_this.html || (('|' + _this.commonWhiteList + '|' + whiteList + '|').indexOf('|' + matches[2].toLowerCase() + '|')) >= 0) {
              return _this.makeHolder(matches[0]);
            } else {
              return htmlspecialchars(matches[0]);
            }
          };
        })(this));
        if (this.html) {
          text = text.replace(/<!\-\-(.*?)\-\->/g, (function(_this) {
            return function() {
              var matches;
              matches = 1 <= arguments.length ? slice.call(arguments, 0) : [];
              return _this.makeHolder(matches[0]);
            };
          })(this));
        }
        text = str_replace(['<', '>'], ['&lt;', '&gt;'], text);
        text = text.replace(/\[\^((?:[^\]]|\\\]|\\\[)+?)\]/g, (function(_this) {
          return function() {
            var id, matches;
            matches = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            id = _this.footnotes.indexOf(matches[1]);
            if (id < 0) {
              id = _this.footnotes.length + 1;
              _this.footnotes.push(_this.parseInline(matches[1], '', false));
            }
            return _this.makeHolder("<sup id=\"fnref-" + id + "\"><a href=\"#fn-" + id + "\" class=\"footnote-ref\">" + id + "</a></sup>");
          };
        })(this));
        text = text.replace(/!\[((?:[^\]]|\\\]|\\\[)*?)\]\(((?:[^\)]|\\\)|\\\()+?)\)/g, (function(_this) {
          return function() {
            var escaped, matches, url;
            matches = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            escaped = htmlspecialchars(_this.escapeBracket(matches[1]));
            url = _this.escapeBracket(matches[2]);
            url = _this.cleanUrl(url);
            return _this.makeHolder("<img src=\"" + url + "\" alt=\"" + escaped + "\" title=\"" + escaped + "\">");
          };
        })(this));
        text = text.replace(/!\[((?:[^\]]|\\\]|\\\[)*?)\]\[((?:[^\]]|\\\]|\\\[)+?)\]/g, (function(_this) {
          return function() {
            var escaped, matches, result;
            matches = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            escaped = htmlspecialchars(_this.escapeBracket(matches[1]));
            result = _this.definitions[matches[2]] != null ? "<img src=\"" + _this.definitions[matches[2]] + "\" alt=\"" + escaped + "\" title=\"" + escaped + "\">" : escaped;
            return _this.makeHolder(result);
          };
        })(this));
        text = text.replace(/\[((?:[^\]]|\\\]|\\\[)+?)\]\(((?:[^\)]|\\\)|\\\()+?)\)/g, (function(_this) {
          return function() {
            var escaped, matches, url;
            matches = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            escaped = _this.parseInline(_this.escapeBracket(matches[1]), '', false, false);
            url = _this.escapeBracket(matches[2]);
            url = _this.cleanUrl(url);
            return _this.makeHolder("<a href=\"" + url + "\">" + escaped + "</a>");
          };
        })(this));
        text = text.replace(/\[((?:[^\]]|\\\]|\\\[)+?)\]\[((?:[^\]]|\\\]|\\\[)+?)\]/g, (function(_this) {
          return function() {
            var escaped, matches, result;
            matches = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            escaped = _this.parseInline(_this.escapeBracket(matches[1]), '', false, false);
            result = _this.definitions[matches[2]] != null ? "<a href=\"" + _this.definitions[matches[2]] + "\">" + escaped + "</a>" : escaped;
            return _this.makeHolder(result);
          };
        })(this));
        text = this.parseInlineCallback(text);
        text = text.replace(/<([_a-z0-9-\.\+]+@[^@]+\.[a-z]{2,})>/ig, '<a href="mailto:$1">$1</a>');
        if (enableAutoLink) {
          regex = new RegExp("(^|[^\"])((https?):[" + pL + "_0-9-\\./%#!@\\?\\+=~\\|\\,&\\(\\)]+)($|[^\"])", 'ig');
          text = text.replace(regex, (function(_this) {
            return function() {
              var link, matches;
              matches = 1 <= arguments.length ? slice.call(arguments, 0) : [];
              link = _this.call('parseLink', matches[2]);
              return matches[1] + "<a href=\"" + matches[2] + "\">" + link + "</a>" + matches[4];
            };
          })(this));
        }
        text = this.call('afterParseInlineBeforeRelease', text);
        text = this.releaseHolder(text, clearHolders);
        text = this.call('afterParseInline', text);
        return text;
      };
  
      Parser.prototype.parseInlineCallback = function(text) {
        text = text.replace(/(\*{3})((?:.|\r)+?)\1/mg, (function(_this) {
          return function() {
            var matches;
            matches = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return '<strong><em>' + (_this.parseInlineCallback(matches[2])) + '</em></strong>';
          };
        })(this));
        text = text.replace(/(\*{2})((?:.|\r)+?)\1/mg, (function(_this) {
          return function() {
            var matches;
            matches = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return '<strong>' + (_this.parseInlineCallback(matches[2])) + '</strong>';
          };
        })(this));
        text = text.replace(/(\*)((?:.|\r)+?)\1/mg, (function(_this) {
          return function() {
            var matches;
            matches = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return '<em>' + (_this.parseInlineCallback(matches[2])) + '</em>';
          };
        })(this));
        text = text.replace(/(\s+|^)(_{3})((?:.|\r)+?)\2(\s+|$)/mg, (function(_this) {
          return function() {
            var matches;
            matches = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return matches[1] + '<strong><em>' + (_this.parseInlineCallback(matches[3])) + '</em></strong>' + matches[4];
          };
        })(this));
        text = text.replace(/(\s+|^)(_{2})((?:.|\r)+?)\2(\s+|$)/mg, (function(_this) {
          return function() {
            var matches;
            matches = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return matches[1] + '<strong>' + (_this.parseInlineCallback(matches[3])) + '</strong>' + matches[4];
          };
        })(this));
        text = text.replace(/(\s+|^)(_)((?:.|\r)+?)\2(\s+|$)/mg, (function(_this) {
          return function() {
            var matches;
            matches = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return matches[1] + '<em>' + (_this.parseInlineCallback(matches[3])) + '</em>' + matches[4];
          };
        })(this));
        text = text.replace(/(~{2})((?:.|\r)+?)\1/mg, (function(_this) {
          return function() {
            var matches;
            matches = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return '<del>' + (_this.parseInlineCallback(matches[2])) + '</del>';
          };
        })(this));
        return text;
      };
  
      Parser.prototype.parseBlock = function(text, lines) {
        var block, j, key, l, len, len1, line, name, parser, pass, ref, ref1, state;
        ref = text.split("\n");
        for (j = 0, len = ref.length; j < len; j++) {
          line = ref[j];
          lines.push(line);
        }
        this.blocks = [];
        this.current = 'normal';
        this.pos = -1;
        state = {
          special: (array_keys(this.specialWhiteList)).join('|'),
          empty: 0,
          html: false
        };
        for (key = l = 0, len1 = lines.length; l < len1; key = ++l) {
          line = lines[key];
          block = this.getBlock();
          if (block != null) {
            block = block.slice(0);
          }
          if (this.current !== 'normal') {
            pass = this.parsers[this.current](block, key, line, state, lines);
            if (!pass) {
              continue;
            }
          }
          ref1 = this.parsers;
          for (name in ref1) {
            parser = ref1[name];
            if (name !== this.current) {
              pass = parser(block, key, line, state, lines);
              if (!pass) {
                break;
              }
            }
          }
        }
        return this.optimizeBlocks(this.blocks, lines);
      };
  
      Parser.prototype.parseBlockList = function(block, key, line, state) {
        var matches, space;
        if (!!(matches = line.match(/^(\s*)((?:[0-9]+\.)|\-|\+|\*)\s+/i))) {
          space = matches[1].length;
          state.empty = 0;
          if (this.isBlock('list')) {
            this.setBlock(key, space);
          } else {
            this.startBlock('list', key, space);
          }
          return false;
        } else if ((this.isBlock('list')) && !line.match(/^\s*\[((?:[^\]]|\\\]|\\\[)+?)\]:\s*(.+)$/)) {
          if ((state.empty <= 1) && !!(matches = line.match(/^(\s+)/)) && matches[1].length > block[3]) {
            state.empty = 0;
            this.setBlock(key);
            return false;
          } else if ((line.match(/^\s*$/)) && state.empty === 0) {
            state.empty += 1;
            this.setBlock(key);
            return false;
          }
        }
        return true;
      };
  
      Parser.prototype.parseBlockCode = function(block, key, line) {
        var isAfterList, matches, space;
        if (!!(matches = line.match(/^(\s*)(~{3,}|`{3,})([^`~]*)$/i))) {
          if (this.isBlock('code')) {
            isAfterList = block[3][2];
            if (isAfterList) {
              this.combineBlock().setBlock(key);
            } else {
              (this.setBlock(key)).endBlock();
            }
          } else {
            isAfterList = false;
            if (this.isBlock('list')) {
              space = block[3];
              isAfterList = (space > 0 && matches[1].length >= space) || matches[1].length > space;
            }
            this.startBlock('code', key, [matches[1], matches[3], isAfterList]);
          }
          return false;
        } else if (this.isBlock('code')) {
          this.setBlock(key);
          return false;
        }
        return true;
      };
  
      Parser.prototype.parseBlockShtml = function(block, key, line, state) {
        var matches;
        if (this.html) {
          if (!!(matches = line.match(/^(\s*)!!!(\s*)$/))) {
            if (this.isBlock('shtml')) {
              this.setBlock(key).endBlock();
            } else {
              this.startBlock('shtml', key);
            }
            return false;
          } else if (this.isBlock('shtml')) {
            this.setBlock(key);
            return false;
          }
        }
        return true;
      };
  
      Parser.prototype.parseBlockAhtml = function(block, key, line, state) {
        var htmlTagAllRegExp, htmlTagRegExp, lastMatch, m, matches;
        if (this.html) {
          htmlTagRegExp = new RegExp("^\\s*<(" + this.blockHtmlTags + ")(\\s+[^>]*)?>", 'i');
          if (matches = line.match(htmlTagRegExp)) {
            if (this.isBlock('ahtml')) {
              this.setBlock(key);
              return false;
            } else if (matches[2] === void 0 || matches[2] !== '/') {
              this.startBlock('ahtml', key);
              htmlTagAllRegExp = new RegExp("\\s*<(" + this.blockHtmlTags + ")(\\s+[^>]*)?>", 'ig');
              while (true) {
                m = htmlTagAllRegExp.exec(line);
                if (!m) {
                  break;
                }
                lastMatch = m[1];
              }
              if (0 <= line.indexOf("</" + lastMatch + ">")) {
                this.endBlock();
              } else {
                state.html = lastMatch;
              }
              return false;
            }
          } else if (!!state.html && 0 <= line.indexOf("</" + state.html + ">")) {
            this.setBlock(key).endBlock();
            state.html = false;
            return false;
          } else if (this.isBlock('ahtml')) {
            this.setBlock(key);
            return false;
          } else if (!!(matches = line.match(/^\s*<!\-\-(.*?)\-\->\s*$/))) {
            this.startBlock('ahtml', key).endBlock();
            return false;
          }
        }
        return true;
      };
  
      Parser.prototype.parseBlockMath = function(block, key, line) {
        var matches;
        if (!!(matches = line.match(/^(\s*)\$\$(\s*)$/))) {
          if (this.isBlock('math')) {
            this.setBlock(key).endBlock();
          } else {
            this.startBlock('math', key);
          }
          return false;
        } else if (this.isBlock('math')) {
          this.setBlock(key);
          return false;
        }
        return true;
      };
  
      Parser.prototype.parseBlockPre = function(block, key, line, state) {
        if (!!(line.match(/^ {4}/))) {
          if (this.isBlock('pre')) {
            this.setBlock(key);
          } else {
            this.startBlock('pre', key);
          }
          return false;
        } else if ((this.isBlock('pre')) && line.match(/^\s*$/)) {
          this.setBlock(key);
          return false;
        }
        return true;
      };
  
      Parser.prototype.parseBlockHtml = function(block, key, line, state) {
        var matches, tag;
        if (!!(matches = line.match(new RegExp("^\\s*<(" + state.special + ")(\\s+[^>]*)?>", 'i')))) {
          tag = matches[1].toLowerCase();
          if (!(this.isBlock('html', tag)) && !(this.isBlock('pre'))) {
            this.startBlock('html', key, tag);
          }
          return false;
        } else if (!!(matches = line.match(new RegExp("</(" + state.special + ")>\\s*$", 'i')))) {
          tag = matches[1].toLowerCase();
          if (this.isBlock('html', tag)) {
            this.setBlock(key).endBlock();
          }
          return false;
        } else if (this.isBlock('html')) {
          this.setBlock(key);
          return false;
        }
        return true;
      };
  
      Parser.prototype.parseBlockFootnote = function(block, key, line) {
        var matches, space;
        if (!!(matches = line.match(/^\[\^((?:[^\]]|\\\]|\\\[)+?)\]:/))) {
          space = matches[0].length - 1;
          this.startBlock('footnote', key, [space, matches[1]]);
          return false;
        }
        return true;
      };
  
      Parser.prototype.parseBlockDefinition = function(block, key, line) {
        var matches;
        if (!!(matches = line.match(/^\s*\[((?:[^\]]|\\\]|\\\[)+?)\]:\s*(.+)$/))) {
          this.definitions[matches[1]] = this.cleanUrl(matches[2]);
          this.startBlock('definition', key).endBlock();
          return false;
        }
        return true;
      };
  
      Parser.prototype.parseBlockQuote = function(block, key, line) {
        var matches;
        if (!!(matches = line.match(/^(\s*)>/))) {
          if ((this.isBlock('list')) && matches[1].length > 0) {
            this.setBlock(key);
          } else if (this.isBlock('quote')) {
            this.setBlock(key);
          } else {
            this.startBlock('quote', key);
          }
          return false;
        }
        return true;
      };
  
      Parser.prototype.parseBlockTable = function(block, key, line, state, lines) {
        var align, aligns, head, j, len, matches, row, rows;
        if (!!(matches = line.match(/^((?:(?:(?:\||\+)(?:[ :]*\-+[ :]*)(?:\||\+))|(?:(?:[ :]*\-+[ :]*)(?:\||\+)(?:[ :]*\-+[ :]*))|(?:(?:[ :]*\-+[ :]*)(?:\||\+))|(?:(?:\||\+)(?:[ :]*\-+[ :]*)))+)$/))) {
          if (this.isBlock('table')) {
            block[3][0].push(block[3][2]);
            block[3][2] += 1;
            this.setBlock(key, block[3]);
          } else {
            head = 0;
            if ((block == null) || block[0] !== 'normal' || lines[block[2]].match(/^\s*$/)) {
              this.startBlock('table', key);
            } else {
              head = 1;
              this.backBlock(1, 'table');
            }
            if (matches[1][0] === '|') {
              matches[1] = matches[1].substring(1);
              if (matches[1][matches[1].length - 1] === '|') {
                matches[1] = matches[1].substring(0, matches[1].length - 1);
              }
            }
            rows = matches[1].split(/\+|\|/);
            aligns = [];
            for (j = 0, len = rows.length; j < len; j++) {
              row = rows[j];
              align = 'none';
              if (!!(matches = row.match(/^\s*(:?)\-+(:?)\s*$/))) {
                if (!!matches[1] && !!matches[2]) {
                  align = 'center';
                } else if (!!matches[1]) {
                  align = 'left';
                } else if (!!matches[2]) {
                  align = 'right';
                }
              }
              aligns.push(align);
            }
            this.setBlock(key, [[head], aligns, head + 1]);
          }
          return false;
        }
        return true;
      };
  
      Parser.prototype.parseBlockSh = function(block, key, line) {
        var matches, num;
        if (!!(matches = line.match(/^(#+)(.*)$/))) {
          num = Math.min(matches[1].length, 6);
          this.startBlock('sh', key, num).endBlock();
          return false;
        }
        return true;
      };
  
      Parser.prototype.parseBlockMh = function(block, key, line, state, lines) {
        var matches;
        if (!!(matches = line.match(/^\s*((=|-){2,})\s*$/)) && ((block != null) && block[0] === 'normal' && !lines[block[2]].match(/^\s*$/))) {
          if (this.isBlock('normal')) {
            this.backBlock(1, 'mh', matches[1][0] === '=' ? 1 : 2).setBlock(key).endBlock();
          } else {
            this.startBlock('normal', key);
          }
          return false;
        }
        return true;
      };
  
      Parser.prototype.parseBlockHr = function(block, key, line) {
        if (!!(line.match(/^[-\*]{3,}\s*$/))) {
          this.startBlock('hr', key).endBlock();
          return false;
        }
        return true;
      };
  
      Parser.prototype.parseBlockDefault = function(block, key, line, state) {
        var matches;
        if (this.isBlock('footnote')) {
          matches = line.match(/^(\s*)/);
          if (matches[1].length >= block[3][0]) {
            this.setBlock(key);
          } else {
            this.startBlock('normal', key);
          }
        } else if (this.isBlock('table')) {
          if (0 <= line.indexOf('|')) {
            block[3][2] += 1;
            this.setBlock(key, block[3]);
          } else {
            this.startBlock('normal', key);
          }
        } else if (this.isBlock('quote')) {
          if (!line.match(/^(\s*)$/)) {
            this.setBlock(key);
          } else {
            this.startBlock('normal', key);
          }
        } else {
          if ((block == null) || block[0] !== 'normal') {
            this.startBlock('normal', key);
          } else {
            this.setBlock(key);
          }
        }
        return true;
      };
  
      Parser.prototype.optimizeBlocks = function(_blocks, _lines) {
        var block, blocks, from, isEmpty, key, lines, moved, nextBlock, prevBlock, to, type, types;
        blocks = _blocks.slice(0);
        lines = _lines.slice(0);
        blocks = this.call('beforeOptimizeBlocks', blocks, lines);
        key = 0;
        while (blocks[key] != null) {
          moved = false;
          block = blocks[key];
          prevBlock = blocks[key - 1] != null ? blocks[key - 1] : null;
          nextBlock = blocks[key + 1] != null ? blocks[key + 1] : null;
          type = block[0], from = block[1], to = block[2];
          if ('pre' === type) {
            isEmpty = (lines.slice(block[1], block[2] + 1)).reduce(function(result, line) {
              return (line.match(/^\s*$/)) && result;
            }, true);
            if (isEmpty) {
              block[0] = type = 'normal';
            }
          }
          if ('normal' === type) {
            types = ['list', 'quote'];
            if (from === to && (lines[from].match(/^\s*$/)) && (prevBlock != null) && (nextBlock != null)) {
              if (prevBlock[0] === nextBlock[0] && (types.indexOf(prevBlock[0])) >= 0) {
                blocks[key - 1] = [prevBlock[0], prevBlock[1], nextBlock[2], null];
                blocks.splice(key, 2);
                moved = true;
              }
            }
          }
          if (!moved) {
            key += 1;
          }
        }
        return this.call('afterOptimizeBlocks', blocks, lines);
      };
  
      Parser.prototype.parseCode = function(lines, parts, start) {
        var blank, count, isEmpty, lang, rel, str;
        blank = parts[0], lang = parts[1];
        lang = trim(lang);
        count = blank.length;
        if (!lang.match(/^[_a-z0-9-\+\#\:\.]+$/i)) {
          lang = null;
        } else {
          parts = lang.split(':');
          if (parts.length > 1) {
            lang = parts[0], rel = parts[1];
            lang = trim(lang);
            rel = trim(rel);
          }
        }
        isEmpty = true;
        lines = lines.slice(1, -1).map(function(line) {
          line = line.replace(new RegExp("/^[ ]{" + count + "}/"), '');
          if (isEmpty && !line.match(/^\s*$/)) {
            isEmpty = false;
          }
          return htmlspecialchars(line);
        });
        str = (this.markLines(lines, start + 1)).join("\n");
        if (isEmpty) {
          return '';
        } else {
          return '<pre><code' + (!!lang ? " class=\"" + lang + "\"" : '') + (!!rel ? " rel=\"" + rel + "\"" : '') + '>' + str + '</code></pre>';
        }
      };
  
      Parser.prototype.parsePre = function(lines, value, start) {
        var str;
        lines = lines.map(function(line) {
          return htmlspecialchars(line.substring(4));
        });
        str = (this.markLines(lines, start)).join("\n");
        if (str.match(/^\s*$/)) {
          return '';
        } else {
          return '<pre><code>' + str + '</code></pre>';
        }
      };
  
      Parser.prototype.parseAhtml = function(lines, value, start) {
        return trim((this.markLines(lines, start)).join("\n"));
      };
  
      Parser.prototype.parseShtml = function(lines, value, start) {
        return trim((this.markLines(lines.slice(1, -1), start + 1)).join("\n"));
      };
  
      Parser.prototype.parseMath = function(lines, value, start, end) {
        return '<p>' + (this.markLine(start, end)) + (htmlspecialchars(lines.join("\n"))) + '</p>';
      };
  
      Parser.prototype.parseSh = function(lines, num, start, end) {
        var line;
        line = (this.markLine(start, end)) + this.parseInline(trim(lines[0], '# '));
        if (line.match(/^\s*$/)) {
          return '';
        } else {
          return "<h" + num + ">" + line + "</h" + num + ">";
        }
      };
  
      Parser.prototype.parseMh = function(lines, num, start, end) {
        return this.parseSh(lines, num, start, end);
      };
  
      Parser.prototype.parseQuote = function(lines, value, start) {
        var str;
        lines = lines.map(function(line) {
          return line.replace(/^\s*> ?/, '');
        });
        str = lines.join("\n");
        if (str.match(/^\s*$/)) {
          return '';
        } else {
          return '<blockquote>' + (this.parse(str, true, start)) + '</blockquote>';
        }
      };
  
      Parser.prototype.parseList = function(lines, value, start) {
        var found, html, j, key, l, lastType, leftLines, leftStart, len, len1, line, matches, minSpace, row, rows, secondFound, secondMinSpace, space, text, type;
        html = '';
        minSpace = 99999;
        secondMinSpace = 99999;
        found = false;
        secondFound = false;
        rows = [];
        for (key = j = 0, len = lines.length; j < len; key = ++j) {
          line = lines[key];
          if (matches = line.match(/^(\s*)((?:[0-9]+\.?)|\-|\+|\*)(\s+)(.*)$/i)) {
            space = matches[1].length;
            type = 0 <= '+-*'.indexOf(matches[2]) ? 'ul' : 'ol';
            minSpace = Math.min(space, minSpace);
            found = true;
            if (space > 0) {
              secondMinSpace = Math.min(space, secondMinSpace);
              secondFound = true;
            }
            rows.push([space, type, line, matches[4]]);
          } else {
            rows.push(line);
            if (!!(matches = line.match(/^(\s*)/))) {
              space = matches[1].length;
              if (space > 0) {
                secondMinSpace = Math.min(space, secondMinSpace);
                secondFound = true;
              }
            }
          }
        }
        minSpace = found ? minSpace : 0;
        secondMinSpace = secondFound ? secondMinSpace : minSpace;
        lastType = '';
        leftLines = [];
        leftStart = 0;
        for (key = l = 0, len1 = rows.length; l < len1; key = ++l) {
          row = rows[key];
          if (row instanceof Array) {
            space = row[0], type = row[1], line = row[2], text = row[3];
            if (space !== minSpace) {
              leftLines.push(line.replace(new RegExp("^\\s{" + secondMinSpace + "}"), ''));
            } else {
              if (leftLines.length > 0) {
                html += '<li>' + (this.parse(leftLines.join("\n"), true, start + leftStart)) + '</li>';
              }
              if (lastType !== type) {
                if (!!lastType) {
                  html += "</" + lastType + ">";
                }
                html += "<" + type + ">";
              }
              leftStart = key;
              leftLines = [text];
              lastType = type;
            }
          } else {
            leftLines.push(row.replace(new RegExp("^\\s{" + secondMinSpace + "}"), ''));
          }
        }
        if (leftLines.length > 0) {
          html += '<li>' + (this.parse(leftLines.join("\n"), true, start + leftStart)) + ("</li></" + lastType + ">");
        }
        return html;
      };
  
      Parser.prototype.parseTable = function(lines, value, start) {
        var aligns, body, column, columns, head, html, ignores, j, key, l, last, len, len1, line, num, output, row, rows, tag, text;
        ignores = value[0], aligns = value[1];
        head = ignores.length > 0 && (ignores.reduce(function(prev, curr) {
          return curr + prev;
        })) > 0;
        html = '<table>';
        body = head ? null : true;
        output = false;
        for (key = j = 0, len = lines.length; j < len; key = ++j) {
          line = lines[key];
          if (0 <= ignores.indexOf(key)) {
            if (head && output) {
              head = false;
              body = true;
            }
            continue;
          }
          line = trim(line);
          output = true;
          if (line[0] === '|') {
            line = line.substring(1);
            if (line[line.length - 1] === '|') {
              line = line.substring(0, line.length - 1);
            }
          }
          rows = line.split('|').map(function(row) {
            if (row.match(/^\s*$/)) {
              return ' ';
            } else {
              return trim(row);
            }
          });
          columns = {};
          last = -1;
          for (l = 0, len1 = rows.length; l < len1; l++) {
            row = rows[l];
            if (row.length > 0) {
              last += 1;
              columns[last] = [(columns[last] != null ? columns[last][0] + 1 : 1), row];
            } else if (columns[last] != null) {
              columns[last][0] += 1;
            } else {
              columns[0] = [1, row];
            }
          }
          if (head) {
            html += '<thead>';
          } else if (body) {
            html += '<tbody>';
          }
          html += '<tr';
          if (this.line) {
            html += ' class="line" data-start="' + (start + key) + '" data-end="' + (start + key) + '" data-id="' + this.uniqid + '"';
          }
          html += '>';
          for (key in columns) {
            column = columns[key];
            num = column[0], text = column[1];
            tag = head ? 'th' : 'td';
            html += "<" + tag;
            if (num > 1) {
              html += " colspan=\"" + num + "\"";
            }
            if ((aligns[key] != null) && aligns[key] !== 'none') {
              html += " align=\"" + aligns[key] + "\"";
            }
            html += '>' + (this.parseInline(text)) + ("</" + tag + ">");
          }
          html += '</tr>';
          if (head) {
            html += '</thead>';
          } else if (body) {
            body = false;
          }
        }
        if (body !== null) {
          html += '</tbody>';
        }
        return html += '</table>';
      };
  
      Parser.prototype.parseHr = function(lines, value, start) {
        if (this.line) {
          return '<hr class="line" data-start="' + start + '" data-end="' + start + '">';
        } else {
          return '<hr>';
        }
      };
  
      Parser.prototype.parseNormal = function(lines, inline, start) {
        var key, str;
        if (inline == null) {
          inline = false;
        }
        key = 0;
        lines = lines.map((function(_this) {
          return function(line) {
            line = _this.parseInline(line);
            if (!line.match(/^\s*$/)) {
              line = (_this.markLine(start + key)) + line;
            }
            key += 1;
            return line;
          };
        })(this));
        str = trim(lines.join("\n"));
        str = str.replace(/(\n\s*){2,}/g, '</p><p>');
        str = str.replace(/\n/g, '<br>');
        if (str.match(/^\s*$/)) {
          return '';
        } else {
          if (inline) {
            return str;
          } else {
            return "<p>" + str + "</p>";
          }
        }
      };
  
      Parser.prototype.parseFootnote = function(lines, value) {
        var index, note, space;
        space = value[0], note = value[1];
        index = this.footnotes.indexOf(note);
        if (index >= 0) {
          lines = lines.slice(0);
          lines[0] = lines[0].replace(/^\[\^((?:[^\]]|\]|\[)+?)\]:/, '');
          this.footnotes[index] = lines;
        }
        return '';
      };
  
      Parser.prototype.parseDefinition = function() {
        return '';
      };
  
      Parser.prototype.parseHtml = function(lines, type, start) {
        lines = lines.map((function(_this) {
          return function(line) {
            return _this.parseInline(line, _this.specialWhiteList[type] != null ? _this.specialWhiteList[type] : '');
          };
        })(this));
        return (this.markLines(lines, start)).join("\n");
      };
  
      Parser.prototype.cleanUrl = function(url) {
        var matches, regexUrl, regexWord;
        regexUrl = new RegExp("^\\s*((http|https|ftp|mailto):[" + pL + "_a-z0-9-:\\.\\*/%#!@\\?\\+=~\\|\\,&\\(\\)]+)", 'i');
        regexWord = new RegExp("^\\s*([" + pL + "_a-z0-9-:\\.\\*/%#!@\\?\\+=~\\|\\,&]+)", 'i');
        if (!!(matches = url.match(regexUrl))) {
          return matches[1];
        } else if (!!(matches = url.match(regexWord))) {
          return matches[1];
        } else {
          return '#';
        }
      };
  
      Parser.prototype.escapeBracket = function(str) {
        return str_replace(['\\[', '\\]', '\\(', '\\)'], ['[', ']', '(', ')'], str);
      };
  
      Parser.prototype.startBlock = function(type, start, value) {
        if (value == null) {
          value = null;
        }
        this.pos += 1;
        this.current = type;
        this.blocks.push([type, start, start, value]);
        return this;
      };
  
      Parser.prototype.endBlock = function() {
        this.current = 'normal';
        return this;
      };
  
      Parser.prototype.isBlock = function(type, value) {
        if (value == null) {
          value = null;
        }
        return this.current === type && (null === value ? true : this.blocks[this.pos][3] === value);
      };
  
      Parser.prototype.getBlock = function() {
        if (this.blocks[this.pos] != null) {
          return this.blocks[this.pos];
        } else {
          return null;
        }
      };
  
      Parser.prototype.setBlock = function(to, value) {
        if (to == null) {
          to = null;
        }
        if (value == null) {
          value = null;
        }
        if (to !== null) {
          this.blocks[this.pos][2] = to;
        }
        if (value !== null) {
          this.blocks[this.pos][3] = value;
        }
        return this;
      };
  
      Parser.prototype.backBlock = function(step, type, value) {
        var item, last;
        if (value == null) {
          value = null;
        }
        if (this.pos < 0) {
          return this.startBlock(type, 0, value);
        }
        last = this.blocks[this.pos][2];
        this.blocks[this.pos][2] = last - step;
        item = [type, last - step + 1, last, value];
        if (this.blocks[this.pos][1] <= this.blocks[this.pos][2]) {
          this.pos += 1;
          this.blocks.push(item);
        } else {
          this.blocks[this.pos] = item;
        }
        this.current = type;
        return this;
      };
  
      Parser.prototype.combineBlock = function() {
        var current, prev;
        if (this.pos < 1) {
          return this;
        }
        prev = this.blocks[this.pos - 1].slice(0);
        current = this.blocks[this.pos].slice(0);
        prev[2] = current[2];
        this.blocks[this.pos - 1] = prev;
        this.current = prev[0];
        this.blocks = this.blocks.slice(0, -1);
        this.pos -= 1;
        return this;
      };
  
      return Parser;
  
    })();
  
    if (typeof module !== "undefined" && module !== null) {
      module.exports = Parser;
    } else if (typeof window !== "undefined" && window !== null) {
      window.HyperDown = Parser;
    }
  
  }).call(this);