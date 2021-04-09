<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Langnang</title>
    <link rel="shortcut icon" href="./favicon.ico">
    <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
    <!-- 可选的 Bootstrap 主题文件（一般不用引入） -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css">

</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-md-12" id="app">
            <div class="panel panel-primary" id="static">
                <div class="panel-heading"></div>
                <div class="panel-body">
                    <div class="row">
                    </div>
                </div>
            </div>
            <div class="panel panel-primary" id="php">
                <div class="panel-heading"></div>
            </div>
            <div class="panel panel-primary" id="template">
                <div class="panel-heading"></div>
            </div>
            <div class="panel panel-primary" id="storage">
                <div class="panel-heading"></div>
            </div>
        </div>
    </div>
</div>
<!-- jQuery (Bootstrap 的所有 JavaScript 插件都依赖 jQuery，所以必须放在前边) -->
<script src="https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js"></script>
<!-- 加载 Bootstrap 的所有 JavaScript 插件。你也可以根据需要只加载单个插件。 -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js"></script>
<script>
    $(document).ready(function () {
        /**
         * status:-1（未开始），0（开发中），200（已上线），404（已下线）
         */
        $.get("/sites.json", function (res) {
            $("#app").html('');

            res.forEach(type => {
                $("#app").append(createSites(type));
            })
        })

        function createSites(site) {
            let content = `
            <div class="panel panel-primary" id="static">
                <div class="panel-heading">${site.name}</div>
                <div class="panel-body">
                    <div class="row">`
            site.children.forEach(v => {
                content += createSiteItem(v);
            })

            content += `</div>
                </div>
            </div>
            `;
            return content;
        }

        function createSiteItem(item) {
            return `
                <div class="col-sm-6 col-md-4">
                    <a href="${item.href}" target="_blank">
                        <div class="thumbnail">
                            <div class="caption">
                                <h3>${item.name}</h3>
                            </div>
                        </div>
                    </a>
                </div>
            `;
        }


    })
</script>
</body>
</html>