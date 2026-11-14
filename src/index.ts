import ContentJsonInterpreter from "./components/interpreter"
import { createRequire } from 'module';

var require = createRequire(import.meta.url);
var module = { exports: {} };

export default ContentJsonInterpreter;
