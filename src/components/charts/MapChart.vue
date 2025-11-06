<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts'
import { registerMap } from 'echarts/core'
import { worldMapData } from '../../utils/worldMap'

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: '500px'
  }
})

const chartContainer = ref(null)
let chart = null

// 初始化图表
const initChart = () => {
  if (!chartContainer.value) return
  
  // 销毁之前的图表实例
  if (chart) {
    chart.dispose()
  }
  
  // 注册世界地图
  registerMap('world', worldMapData)
  
  // 创建新的图表实例
  chart = echarts.init(chartContainer.value)
  
  // 设置图表选项
  const option = {
    title: {
      text: props.title,
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
    },
    visualMap: {
      min: props.chartData.min || 0,
      max: props.chartData.max || 100,
      text: props.chartData.visualMapText || ['高', '低'],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027']
      }
    },
    series: [
      {
        name: props.chartData.seriesName || '',
        type: 'map',
        map: 'world',
        roam: true,
        emphasis: {
          label: {
            show: true
          }
        },
        data: props.chartData.data || []
      }
    ]
  }
  
  // 应用选项
  chart.setOption(option)
  
  // 响应窗口大小变化
  window.addEventListener('resize', () => {
    chart && chart.resize()
  })
}

// 监听数据变化
watch(() => props.chartData, () => {
  nextTick(() => {
    initChart()
  })
}, { deep: true })

// 组件挂载后初始化图表
onMounted(() => {
  initChart()
})

// 导出图表方法
defineExpose({
  // 导出图表为图片
  exportImage: (type = 'png') => {
    if (!chart) return ''
    return chart.getDataURL({ type, pixelRatio: 2, backgroundColor: '#fff' })
  },
  // 获取图表实例
  getChartInstance: () => chart
})
</script>

<template>
  <div ref="chartContainer" :style="{ height }"></div>
</template>

<style scoped>
/* 图表容器样式 */
</style>