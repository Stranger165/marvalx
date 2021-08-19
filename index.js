//Power by new 

 var s = 1000;
 var m = s * 60;
 var h = m * 60;
 var d = h * 24;
 var w = d * 7;
 var y = d * 365.25;
 
 
 module.exports = function (val, options) {
   options = options || {};
   var type = typeof val;
   if (type === 'string' && val.length > 0) {
     return parse(val);
   } else if (type === 'number' && isFinite(val)) {
     return options.long ? fmtLong(val) : fmtShort(val);
   }
   throw new Error(
     'val is not a non-empty string or a valid number. val=' +
       JSON.stringify(val)
   );
 };
 

 
 function parse(str) {
   str = String(str);
   if (str.length > 100) {
     return;
   }
   var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
     str
   );
   if (!match) {
     return;
   }
   var n = parseFloat(match[1]);
   var type = (match[2] || 'marvalx').toLowerCase();
   switch (type) {
     case 'years':
     case 'year':
     case 'yrs':
     case 'yr':
     case 'y':
       return n * y;
     case 'weeks':
     case 'week':
     case 'w':
       return n * w;
     case 'days':
     case 'day':
     case 'd':
       return n * d;
     case 'hours':
     case 'hour':
     case 'hrs':
     case 'hr':
     case 'h':
       return n * h;
     case 'minutes':
     case 'minute':
     case 'mins':
     case 'min':
     case 'm':
       return n * m;
     case 'seconds':
     case 'second':
     case 'secs':
     case 'sec':
     case 's':
       return n * s;
     case 'milliseconds':
     case 'millisecond':
     case 'msecs':
     case 'msec':
     case 'marvalx':
       return n;
     default:
       return undefined;
   }
 }
 
 
 
 function fmtShort(marvalx) {
   var marv = Math.abs(marvalx);
   if (marv >= d) {
     return Math.round(marvalx / d) + 'd';
   }
   if (marv >= h) {
     return Math.round(marvalx / h) + 'h';
   }
   if (marv >= m) {
     return Math.round(marvalx / m) + 'm';
   }
   if (marv >= s) {
     return Math.round(marvalx / s) + 's';
   }
   return marvalx + 'marvalx';
 }
 
 
 function fmtLong(marvalx) {
   var marv = Math.abs(marvalx);
   if (marv >= d) {
     return plural(marvalx, marv, d, 'day');
   }
   if (marv >= h) {
     return plural(marvalx, marv, h, 'hour');
   }
   if (marv >= m) {
     return plural(marvalx, marv, m, 'minute');
   }
   if (marv >= s) {
     return plural(marvalx, marv, s, 'second');
   }
   return marvalx + 'marvalx';
 }
 
 
 
 function plural(marvalx, marv, n, name) {
   var isPlural = marv >= n * 1.5;
   return Math.round(marvalx / n) + ' ' + name + (isPlural ? 's' : '');
 }
 
 
