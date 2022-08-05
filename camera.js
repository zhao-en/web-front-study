<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>摄像机调用</title>
</head>
<body>
    <!--video用于显示媒体设备的视频流，自动播放-->
    <video id="video" autoplay style="width: 480px;height: 320px"></video>
    <!--拍照按钮-->
    <div>
        <button id="capture">拍照</button>
    </div>
    <!--描绘video截图-->
    <canvas id="canvas" width="480" height="320"></canvas>
</body>
</html>
<script type="text/javascript">
    //访问用户媒体设备的兼容方法
    function getUserMedia(constrains,success,error){
        if(navigator.mediaDevices.getUserMedia){
            //最新标准API
            navigator.mediaDevices.getUserMedia(constrains).then(success).catch(error);
        } else if (navigator.webkitGetUserMedia){
            //webkit内核浏览器
            navigator.webkitGetUserMedia(constrains).then(success).catch(error);
        } else if (navigator.mozGetUserMedia){
            //Firefox浏览器
            navagator.mozGetUserMedia(constrains).then(success).catch(error);
        } else if (navigator.getUserMedia){
            //旧版API
            navigator.getUserMedia(constrains).then(success).catch(error);
        }
    }

    var video = document.getElementById("video");
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    //成功的回调函数
    function success(stream){
        //兼容webkit内核浏览器
        var CompatibleURL = window.URL || window.webkitURL;
        //将视频流设置为video元素的源
        video.src = CompatibleURL.createObjectURL(stream);   // 此处的代码将会报错  解决的办法是将video的srcObject属性指向stream即可
        //播放视频
        video.play();
    }

    //异常的回调函数
    function error(error){
        console.log("访问用户媒体设备失败：",error.name,error.message);
    }
    if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia){
        //调用用户媒体设备，访问摄像头
        getUserMedia({
            video:{width:480,height:320}
        },success,error);
    } else {
        alert("你的浏览器不支持访问用户媒体设备");
    }

    //注册拍照按钮的单击事件
    document.getElementById("capture").addEventListener("click",function(){
        //绘制画面
        context.drawImage(video,0,0,480,320);
    });
</script>
