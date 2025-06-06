document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const hiddenElements = [...body.querySelectorAll('[transition^="on-scroll"]')].filter(
      el => el.getAttribute('transition')
    );
    body.classList.add('ready');
    const params = new URLSearchParams(window.location.search);
    if (params.has('transition') && params.get('transition') === 'false') {
      body.classList.add('transition-is-off');
      return;
    }
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          try {
            if (entry.isIntersecting) {
              const element = entry.target;
              const transitions = element.getAttribute('transition').replace('on-scroll', 'active');
              element.setAttribute('transition', transitions);
              hiddenElements.splice(hiddenElements.indexOf(element), 1);
              observer.unobserve(element);
              if (hiddenElements.length === 0) {
                observer.disconnect();
              }
            }
          } catch (error) {
            console.error('Error processing element:', error);
          }
        });
      },
      { rootMargin: '0px 0px 100px 0px' }
    );
    hiddenElements.forEach(element => observer.observe(element));
  });