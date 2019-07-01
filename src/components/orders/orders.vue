<template>
     <div>
       <div id="allmap" style="width:50%;height:500px"></div>
     </div>
</template>

<script>
import BMap from 'BMap'
export default {
  mounted () {
    // var lng='';
    // var lat='';
    var map = new BMap.Map('allmap') // 创建地图实例
    var point = new BMap.Point(116.331398, 39.897445) // 创建点坐标
    map.centerAndZoom(point, 15) // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放

    map.addControl(new BMap.NavigationControl())
    map.addControl(new BMap.ScaleControl())
    map.addControl(new BMap.OverviewMapControl())
    map.addControl(new BMap.MapTypeControl())
    map.setCurrentCity('武汉') // 仅当设置城市信息时，MapTypeControl的切换功能才能可用

    // var opts = {type: BMAP_NAVIGATION_CONTROL_ZOOM}
    // map.addControl(new BMap.NavigationControl(opts)); 自定义控件

    map.setMapStyle({style: 'midnight'})// 地图风格
  }
}
</script>

<style>

</style>
