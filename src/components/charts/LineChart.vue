<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

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
    default: '400px'
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
  
  // 创建新的图表实例
  chart = echarts.init(chartContainer.value)
  
  // 设置图表选项
  const option = {
    title: {
      text: props.title,
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: props.chartData.legend || [],
      bottom: 10
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.chartData.xAxis || []
    },
    yAxis: {
      type: 'value'
    },
    series: props.chartData.series || []
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