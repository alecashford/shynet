window.onload = function () {
  var idempotency =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  function sendUpdate() {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "{{protocol}}://{{request.site.domain|default:request.META.HTTP_HOST}}{{endpoint}}",
        true
      );
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          idempotency: idempotency,
          referrer: document.referrer,
          location: window.location.href,
          loadTime:
            window.performance.timing.domContentLoadedEventEnd -
            window.performance.timing.navigationStart,
        })
      );
    } catch {}
  }
  setInterval(sendUpdate, 5000);
  sendUpdate();
};
