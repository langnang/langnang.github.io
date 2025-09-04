(function ($, window, document, undefined) {

  $.fn.render = function (data, options) { }
  $.fn.renderTab = function (data, options) { }
  $.fn.renderTabContent = function (data, options) { }
  const components = {};
  $.createComponent = function (key, options, $callback) {
    // console.log(arguments)
  }

  $.makeComponent = function (key, data) { }

  $.fn.renderComponent = function (key, data) { }

  $.makeHtml = function () {
    // console.log(arguments)
  }
  $.makeCard = function (item, index) {
    const id = `${item.slug}--${index}`.replace(/\.| |\(|\)/g, "-")
    const getIcoPath = (ico, url) => {
      if (url && ico == 'favicon') return url + 'favicon.ico';
      if (ico != 'favicon') return ico;
      return '';
    }

    const makeIco = (data) => {
      return `<img class="lazy" data-original="${getIcoPath(data.ico, data.url)}" style="height: 90%;margin-top: 5%;" onerror="event.srcElement.src='https://unpkg.com/@fortawesome/fontawesome-free@7.0.0/svgs/solid/earth-america.svg';event.srcElement.onerror=null;"/>`
    }

    const makeBadge = (data) => {
      let $return = '';
      if (data.disabled == true) {
        $return += `<i class="fa-solid fa-ban position-center display-6 text-danger"></i>`;
      }
      if (data.recommand == true) {
        $return += `
      <span class="badge badge-light p-0 position-absolute left-0 top-0 text-warning">
        <i class="fa-solid fa-star"></i> 
      </span>`;
      }
      if (data.status) {
        let textColor = 'primary';
        switch (data.status) {
          case 'public': break;
          case 'publish': textColor = 'info'; break;
          case 'protect': textColor = 'warning'; break;
          case 'private': textColor = 'danger'; break;
          default: break;
        }
        $return += `<i class="fa-solid fa-circle p-0 position-absolute right-1 top-1 text-${textColor}" style="font-size: .5rem;"></i>`;
      }
      if (data.type == 'link' && data.url) {
        $return += `
      <span class="badge badge-light p-0 position-absolute right-0 bottom-0 text-primary">
        <i class="fa-solid fa-paperclip"></i>
      </span>`;
      }
      return $return;
    }
    const makeModal = (data, data_i) => {
      $return = ` <div class="modal fade" id="${id}" tabindex="-1" aria-modal="true" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="background-color: rgba(255, 255, 255, .6);">
          <div class="modal-header justify-content-center border-0 p-2">
            <h5 class="modal-title">${data.name || data.title || data.slug}</h5>
          </div>
          <div class="modal-body border-0 p-2">
            <p>${data.description || ''}</p>
            <table class="table table-sm table-borderless text-left mb-0">
              <tbody>`;

      if (data.repository) {
        $return += `
      <tr>
        <th scope="row">Repository</th>
        <td>${data.repository || ''}</td>
      </tr>
      `;
      }
      if (data.homepage || data.url) {
        $return += ` 
      <tr>
        <th scope="row">Homepage</th>
        <td>${data.homepage || data.url || ''}</td>
      </tr>
      `;
      }
      if (data.badge) {
        $return += ` 
      <tr>
        <th scope="row">Badge</th>
        <td>${data.badge || ''}</td>
      </tr>
      `;
      }
      if (data.content) {
        $return += ` 
      <tr>
        <th scope="row">Content</th>
        <td>${data.content || ''}</td>
      </tr>
      `;
      }
      $return += `</tbody>
            </table>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn d-none btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn d-none btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    `;
      return $return;
    }
    let $return = '';
    if (item.type == 'category') {
      item.children = (item.children || [])
        .filter(v => v.slug);
      if (item.children && item.children.length > 0)
        $return += ` 
      <div class="card border-0"  style="">
        <div class="card-body p-0 position-absolute">
          <div class="row row-cols-${(item.col || 0) + 1} mx-0 align-items-center" style="height: 100%;" data-toggle="modal" data-target="#${id}">` +
          item.children
            .slice(0, (item.col || 0) + 1)
            .reduce(
              (tol, chd) =>
                tol + `
              <div class="col col--1 row--1 px-1">
                <div class="card border-0 bg-light">
                  <div class="card-body bg-light p-0 left-0 position-absolute overflow-hidden w-100 h-100" style="">
                    ${makeIco(chd)}
                    ${makeBadge(chd)}
                  </div>
                </div>
              </div>`,
              ``
            ) +
          `     </div>` +
          `<div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="${id}--label" aria-hidden="true">
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content bg-transparent border-0">
              <div class="modal-header justify-content-center border-0">
                <h4 class="modal-title rounded-pill w-50" style="background-color: rgba(255, 255, 255, .4);">${item.name || item.title || item.slug}</h4>
              </div>
              <div class="modal-body rounded" style="background-color: rgba(255, 255, 255, .4);">
                ${`<div class="row row-cols-10">` +
          item.children
            .reduce((tol, chd, ind) => tol + `<div class="col col--1 row--1 px-1">${$.makeCard(chd, ind)}</div>`, ''
            ) +
          `</div>`
          }
              </div>
            </div>
          </div>
        </div>` +
          `   </div>
          <div class="card-footer p-0 position-absolute text-light text-truncate" style="bottom: 0; width: 100%">${item.title || item.name || item.slug}</div>
        </div>`;
    } else if (item.type == 'link' && item.url) {
      $return += `
      <a class="card border-0 text-muted" target="_blank" href="${item.url}" style="" data-id="${id}" data-toggle="tooltip" data-placement="bottom" title="${item.title || item.name || item.slug}">
        <div class="card-body bg-light p-0 position-absolute overflow-hidden" style="">
          ${makeIco(item)}
          ${makeBadge(item)}
        </div>
        <div class="card-footer p-0 position-absolute text-light text-truncate" style="bottom: 0; width: 100%">${item.title || item.name || item.slug}</div>
      </a>
      ${makeModal(item, index)}
      `;
    } else {
      $return += `
      <div class="card border-0" style="">
        <div class="card-body bg-light p-0 position-absolute overflow-hidden" style="" data-id="${id}" data-toggle="tooltip" data-placement="bottom" title="${item.title || item.name || item.slug}">
          ${makeIco(item)}
          ${makeBadge(item)}
        </div>
        <div class="card-footer p-0 position-absolute text-light text-truncate" style="bottom: 0; width: 100%">${item.title || item.name || item.slug}</div>
      </div>
      ${makeModal(item, index)}
      `;
    }
    return $return;
  }
})(jQuery, window, document);
$.createComponent('jumbotron', {});
$.createComponent('carousel', {
  render: ``,
  template: '',
  data() {
    return {

    }
  },
  created() { },
  mounted() { },
});
$.createComponent('card');
$.makeHtml();
// moment
$(function () {
  moment.locale('zh-CN');
  setInterval(function () {
    $('#app-time').text(moment().format('HH:mm:ss'));
  }, 500);
  const currentLunar = calendar.solar2lunar(moment().year(), moment().month() + 1, moment().date());
  $('#app-date').text(moment().format('Y年M月D日 第DDD天 第W周 dddd') + ' ' + currentLunar.IMonthCn + currentLunar.IDayCn);

});
$(function () { });
$(function () { });
$(function () { });
$(function () { });
$(function () { });
$(function () { });
$(function () { });
$(function () { });
$(function () { });
$(function () { });
// main
$(function () {
  fetch('./dataset.json?v=' + Date.now())
    .then(response => response.json())
    .then(res => {
      console.log(res);
      const { navs } = res;

      const navGroups = navs
        .filter(v => v.slug && v.type == 'category' && !v.hidden)
        .reduce((t, v) => {
          const index = v.carousel || 0;
          if (!t[index]) t[index] = [];
          t[index].push(v);
          return t;
        }, []);

      let carouselIndicatorHtml = ``;
      let carouselInnerHtml = ``;
      navGroups.forEach((group, g_index) => {
        carouselIndicatorHtml += `<li data-target="#app-carousel" data-slide-to="${g_index}" class="${g_index == 0 ? 'active' : ''}"></li>`;
        let tabHtml = ``;
        let tabContentHtml = ``;
        group
          .sort((a, b) => a.order - b.order)
          .forEach((nav, nav_i) => {
            tabHtml += `
            <li class="nav-item" role="presentation">
              <button class="nav-link btn-block py-1 text-light font-weight-bolder ${nav_i == 0 ? 'active' : ''}" id="${nav.slug}-tab" data-toggle="tab" data-target="#${nav.slug}" type="button" role="tab" aria-controls="${nav.slug}" aria-selected="true">
                ${nav.name || nav.slug}
              </button>
            </li>
            `;

            tabContentHtml += `<div class="tab-pane fade ${nav_i == 0 ? 'show active' : ''}" id="${nav.slug}" role="tabpanel" aria-labelledby="${nav.slug}-tab">`;
            const navChildren = [...(nav.children || []).filter(v => v.slug && v.recommand), ...(nav.children || []).filter(v => v.slug && !v.recommand).sort((a, b) => a.order - b.order)];

            const keywords = Array.from(new Set(navChildren.filter(v => v.keywords).map(v => v.keywords && v.keywords.split(',')).flat(Infinity)));

            tabContentHtml += `<nav aria-label="breadcrumb">
              <ol class="breadcrumb mb-2 py-0 bg-dark--4">
                <li class="breadcrumb-item active"><a href="#" class="badge badge-primary">ALL</a></li>
                ${keywords.reduce((t, v) => t + `<li class="breadcrumb-item"><a href="#" class="badge">${v}</a></li>`, '')}
              </ol>
            </nav>`;
            tabContentHtml += ` <div class="row row-cols-16 row-cols-sm-10 row-cols-md-12 text-center mx-0 masonry">`;
            tabContentHtml += `<div class="col col--1 row--1 masonry-item px-0 text-decoration-none"></div>`;
            navChildren.forEach((child, child_i) => {
              tabContentHtml += `<div class="col col--${child.col || 1} row--${child.row || 1} masonry-item px-0 text-decoration-none" data-id="${child.slug}--${child_i}">`;

              tabContentHtml += $.makeCard(child, child_i);
              tabContentHtml += `</div>`;
            });
            tabContentHtml += `</div> </div>`;
          });
        carouselInnerHtml += `
        <div class="carousel-item ${g_index == 0 ? 'active' : ''}">
          <ul id="app-tab--${g_index}" class="nav nav-pills nav-justified mb-2" role="tablist" style="background-color: rgba(0, 0, 0, 0.3)">${tabHtml}</ul>

          <div id="app-tab-content--${g_index}" class="tab-content">${tabContentHtml}</div>

        </div>`;
      });
      $('#app-carousel--indicators').html(carouselIndicatorHtml);
      $('#app-carousel--inner').html(carouselInnerHtml);
      $('[data-toggle="tooltip"]').tooltip({});
      // console.log($('.masonry').eq(0));
      $('.masonry').eq(0).masonry({
        // options
        itemSelector: '.masonry-item',
        percentPosition: true
      });
      $('img.lazy').lazyload({
        placeholder: 'https://unpkg.com/@fortawesome/fontawesome-free@7.0.0/svgs/solid/earth-america.svg' // 占位符图片
      });
      $('button[data-toggle="tab"]').on('shown.bs.tab', function (event) {
        // console.log(event.target);
        // console.log(event.relatedTarget);
        // console.log($(event.target).data("target"));
        // console.log($(event.relatedTarget).data("target"));
        $($(event.target).data('target') + '>.masonry').masonry({
          // options
          itemSelector: '.masonry-item',
          percentPosition: true
        });
        $('img.lazy').lazyload({
          placeholder: 'https://unpkg.com/@fortawesome/fontawesome-free@7.0.0/svgs/solid/earth-america.svg' // 占位符图片
        });
        console.log($('.modal img.lazy'))
      });
      $('#exampleModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
        modal.find('.modal-title').text('New message to ' + recipient)
        modal.find('.modal-body input').val(recipient)
      })
      var tableRows = {
        1: { name: 'First row', isEditable: true, isRemovable: true },
        2: { name: 'Second row', isEditable: true, isRemovable: true },
        3: { name: 'Third row', isEditable: true, isRemovable: true }
      };

      var menu = new BootstrapMenu('.masonry-item.col.col--1.row--1>.card', {
        /* $rowElem is the jQuery element where the menu was opened. The
         * returned value is the `row` argument passed to each function. */
        fetchElementData: function ($rowElem) {
          console.log($rowElem);
          console.log($rowElem.data('id'));
          return $rowElem;
          //   var rowId = $rowElem.data('rowId');
          //   return tableRows[rowId];
        },
        /* group actions by their id to make use of separators between
         * them in the context menu. Actions not added to any group with
         * this option will appear in a default group of their own. */
        // actionsGroups: [['setEditable', 'setUneditable'], ['deleteRow']],
        /* you can declare 'actions' as an object instead of an array,
         * and its keys will be used as action ids. */
        actions: {
          editName: {
            name: 'Edit name',
            iconClass: 'fa-pencil',
            onClick: function (row) {
              /* ... */
              console.log(arguments, row);
            },
            isShown: function (row) {
              return false;
            },
            isEnabled: function (row) {
              return true;
            }
          },
          editDescription: {
            name: 'Edit description',
            iconClass: 'fa-pencil',
            onClick: function (row) {
              /* ... */
              console.log(arguments, row);
            },
            isShown: function (row) {
              return false;
            },
            isEnabled: function (row) {
              return true;
            }
          },
          setEditable: {
            name: 'Set editable',
            iconClass: 'fa-unlock',
            onClick: function (row) {
              /* ... */
              console.log(arguments, row);
            },
            isShown: function (row) {
              return !true;
            }
          },
          setUneditable: {
            name: 'Set uneditable',
            iconClass: 'fa-lock',
            onClick: function (row) {
              /* ... */
              console.log(arguments, row);
            },
            isShown: function (row) {
              return false;
            }
          },
          showDetail: {
            name: '详情',
            iconClass: 'fa-circle-info',
            onClick: function (element) {
              console.log(arguments, element, $(element));
              $('#' + element.data('id')).modal('show');
            }
          },
          deleteRow: {
            name: 'Delete row',
            iconClass: 'fa-trash-o',
            onClick: function (row) {
              /* ... */
              console.log(arguments, row);
            },
            isShown: function (row) {
              return false;
            },
            isEnabled: function (row) {
              return true && true;
            }
          }
        }
      });
    })
    .then(res => { });
});
