(function ($, window, document, undefined) {

  $.fn.setCurrentTime = function (format = "hh:mm:ss") {
    var date = new Date();

    // 年、月、日
    var year = date.getFullYear();
    var month = ("00" + (date.getMonth() + 1)).slice(-2);
    var day = ("00" + date.getDate()).slice(-2);

    // 时、分、秒
    var hour = ("00" + date.getHours()).slice(-2);
    var minute = ("00" + date.getMinutes()).slice(-2);
    var second = ("00" + date.getSeconds()).slice(-2);

    // 实时显示
    // element.innerText = "" + year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    this.text(year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second);
    // console.log(this);
    // console.log($(this));
    // console.log(el);
  }
  $.fn.setCurrentData = function () { }

  $.fn.render = function (data, options) { }
  $.fn.renderTab = function (data, options) { }
  $.fn.renderTabContent = function (data, options) { }
})(jQuery, window, document);

const makeCard = function (item, index) {
  const getIcoPath = (ico, url) => {
    if (url && ico == 'favicon') return url + 'favicon.ico';
    if (ico != 'favicon') return ico;
    return '';
  }
  let $return = '';
  if (item.type == 'category') {
    $return += ` 
      <div class="card border-0"  style="">
        <div class="card-body p-0 position-absolute">
          <div class="row row-cols-${(item.col || 0) + 1} mx-0 align-items-center" style="height: 100%;" data-toggle="modal" data-target="#${item.slug}--${index}">` +
      (item.children || [])
        .filter(v => v.slug)
        .slice(0, (item.col || 0) + 1)
        .reduce(
          (tol, chd) =>
            tol + `
              <div class="col col--1 row--1 px-1">
                <div class="card border-0 bg-light">
                  <img class="position-absolute top-0" src="${getIcoPath(chd.ico, chd.url)}" style="height: 100%;" onerror="event.srcElement.src='https://unpkg.com/@fortawesome/fontawesome-free@7.0.0/svgs/solid/earth-america.svg';event.srcElement.onerror=null;"/>
                </div>
              </div>`,
          ``
        ) +
      `     </div>` +
      `<div class="modal fade" id="${item.slug}--${index}" tabindex="-1" aria-labelledby="${item.slug}--${index}--label" aria-hidden="true">
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content bg-transparent border-0">
              <div class="modal-body rounded" style="background-color: rgba(255, 255, 255, .4);">
                ${`<div class="row row-cols-10">` +
      (item.children || [])
        .filter(v => v.slug)
        .reduce((tol, chd, ind) => tol + `<div class="col px-1">${makeCard(chd, ind)}</div>`, ''
        ) +
      `</div>`
      }
              </div>
            </div>
          </div>
        </div>` +
      `   </div>
          <div class="card-footer p-0 position-absolute text-light text-truncate" style="bottom: 0; width: 100%">${item.title || item.name || _.upperFirst(item.slug)}</div>
        </div>`;
  } else if (item.type == 'link' && item.url) {
    $return += `
      <a class="card border-0 text-muted" target="_blank" href="${item.url}" style="">
        <div class="card-body bg-light p-0 position-absolute overflow-hidden" style="">
          <img src="${getIcoPath(item.ico, item.url)}" style="height: 100%;" onerror="event.srcElement.src='https://unpkg.com/@fortawesome/fontawesome-free@7.0.0/svgs/solid/earth-america.svg';event.srcElement.onerror=null;"/>
          <span class="badge badge-light p-0 position-absolute right-0 bottom-0 text-primary">
            <i class="fas fa-link"></i>
          </span>
        </div>
        <div class="card-footer p-0 position-absolute text-light text-truncate" style="bottom: 0; width: 100%">${item.title || item.name || _.upperFirst(item.slug)}</div>
      </a>
      `;
  } else {
    $return += `
      <div class="card border-0" style="">
        <div class="card-body bg-light p-0 position-absolute overflow-hidden" style="">
          <img src="${getIcoPath(item.ico, item.url)}" style="height: 100%;" onerror="event.srcElement.src='https://unpkg.com/@fortawesome/fontawesome-free@7.0.0/svgs/solid/earth-america.svg';event.srcElement.onerror=null;"/>
        </div>
        <div class="card-footer p-0 position-absolute text-light text-truncate" style="bottom: 0; width: 100%">${item.title || item.name || _.upperFirst(item.slug)}</div>
      </div>
      `;
  }
  return $return;
}

