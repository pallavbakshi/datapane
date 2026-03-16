// Minimal Stream shim for browser — sax/xml-js only needs Stream as a constructor
function Stream() {}
Stream.prototype.pipe = function () { return this; };
Stream.Stream = Stream;
export default Stream;
export { Stream };
