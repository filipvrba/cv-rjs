export default class Events {
  static send(event, data) {
    event = new CustomEvent(event, {detail: data});
    document.dispatchEvent(event)
  }
}