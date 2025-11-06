import{_ as j,u as z,y as G,r as p,l as N,o as K,q as V,C as x,c as a,a as t,p as R,m as Q,b as B,F as y,e as h,w as F,v as H,d as U,D as J,i as Y,j as n,t as r}from"./index-C13K5DUh.js";import{u as W}from"./ai-DMZ9EY_X.js";const X={class:"chat-ai-page"},Z={class:"chat-container"},tt={class:"sidebar-header"},et={key:0,class:"sidebar-content"},st={class:"main-content"},at={key:0,class:"chat-welcome"},nt={class:"suggested-questions"},it={class:"question-chips"},ot={key:0,class:"user-question"},dt={class:"question-meta"},lt={class:"question-time"},rt={key:1,class:"ai-answer"},ct={class:"answer-content two-column-layout"},ut={class:"answer-column conclusion-column"},vt={class:"answer-conclusion"},pt={class:"answer-column structured-column"},yt={class:"answer-structured"},mt={key:0,class:"structured-tables-container"},ht={class:"table-title"},ft={key:0,class:"structured-table-container"},wt={class:"structured-table"},_t={key:0,colspan:"2",class:"subheader"},bt={class:"key-cell"},kt={class:"value-cell"},Qt={key:1,class:"structured-table-container"},$t={class:"structured-table array-table"},gt={key:2,class:"structured-list-container"},At={class:"structured-list"},St={key:3,class:"structured-simple-container"},Ct={class:"structured-simple-value"},xt={key:1},It={class:"answer-actions"},Dt={class:"answer-meta"},Lt={class:"answer-time"},Rt={key:2,class:"error-message"},Bt={key:0,class:"loading-container"},Mt={class:"chat-input-area"},Ot={class:"input-container"},Pt=["onKeydown"],Et={class:"input-actions"},Tt=["disabled"],qt={__name:"index",setup(jt){const{t:zt}=z(),I=V();Y(),W();const M=G(),v=p(""),$=p(!1),f=p([]);p("assistant"),p([]);const b=p(!0),k=p(null),g=p(null),O=N(()=>M.isLoggedIn),P=p("conclusion");K(()=>{I.query.q&&(v.value=I.query.q,A()),E(),x(()=>{k.value&&k.value.focus()})});const E=()=>{f.value=[{id:1,type:"user",content:"2025年Q3迈阿密三居室的平均每平方英尺价格是多少？",timestamp:new Date(Date.now()-36e5).toISOString()},{id:2,type:"assistant",content:C("2025年Q3迈阿密三居室的平均每平方英尺价格是多少？"),timestamp:new Date(Date.now()-35e5).toISOString()},{id:3,type:"user",content:"比较纽约和东京的租金回报率",timestamp:new Date(Date.now()-26e5).toISOString()},{id:4,type:"assistant",content:C("比较纽约和东京的租金回报率"),timestamp:new Date(Date.now()-25e5).toISOString()}]},A=async()=>{if(!v.value.trim())return;const l={id:Date.now(),type:"user",content:v.value,timestamp:new Date().toISOString()};f.value.push(l),$.value=!0,D();const e=v.value;v.value="";try{await new Promise(o=>setTimeout(o,1500)),P.value="conclusion";const s=C(e),i={id:Date.now()+1,type:"assistant",content:s,timestamp:new Date().toISOString()};f.value.push(i),O.value}catch(s){console.error("发送消息出错:",s),f.value.push({id:Date.now()+1,type:"error",content:"抱歉，处理您的请求时出现了问题，请稍后再试。",timestamp:new Date().toISOString()})}finally{$.value=!1,D(),x(()=>{k.value&&k.value.focus()})}},T=l=>{try{const e=JSON.parse(l),s=[];for(const i in e){const o={title:i,rows:[]},d=e[i];if(Array.isArray(d))if(d.length>0&&typeof d[0]=="object"){const c=new Set;d.forEach(u=>{Object.keys(u).forEach(_=>c.add(_))}),o.type="array-objects",o.columns=Array.from(c),o.items=d}else o.type="array-simple",o.items=d;else if(typeof d=="object"){o.type="key-value";const c=(u,_="")=>{for(const m in u)if(typeof u[m]=="object"&&!Array.isArray(u[m]))o.rows.push({type:"subheader",key:_?`${_} - ${m}`:m}),c(u[m],"");else{let S=u[m];Array.isArray(S)&&(S=S.join(", ")),o.rows.push({type:"data",key:m,value:S})}};c(d)}else o.type="simple",o.rows.push({type:"data",key:i,value:d});s.push(o)}return s}catch(e){return console.error("解析JSON失败:",e),[{title:"错误",type:"key-value",rows:[{type:"data",key:"错误",value:"数据格式错误"}]}]}},D=()=>{x(()=>{g.value&&(g.value.scrollTop=g.value.scrollHeight)})},q=()=>{b.value=!b.value},w=l=>{v.value=l,A()},L=l=>new Date(l).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),C=l=>{let e="",s="",i="",o="";return l.toLowerCase().includes("迈阿密")&&l.toLowerCase().includes("价格")?(o="2025年Q3迈阿密三居室房产市场分析报告",e="2025年Q3迈阿密三居室的平均每平方英尺价格为$580。这比去年同期上涨了8.5%，高于佛罗里达州的平均涨幅（6.2%）。迈阿密市中心区域价格更高，达到每平方英尺$720，而郊区平均为$450。预计到2026年，价格将继续上涨约5-7%。",s=`{
  "基本信息": {
    "地区": "迈阿密",
    "房型": "三居室",
    "时间": "2025年Q3",
    "平均价格": "$580/平方英尺",
    "同比增长": "8.5%",
    "数据来源": "Global Property Index 2025, Miami Real Estate Report Q3 2025"
  },
  "区域价格详情": {
    "市中心": "$720/平方英尺",
    "市中心北部": "$650/平方英尺",
    "市中心南部": "$680/平方英尺",
    "布里克尔": "$750/平方英尺",
    "珊瑚礁": "$620/平方英尺",
    "迈阿密海滩": "$830/平方英尺",
    "近郊区": "$520/平方英尺",
    "远郊区": "$450/平方英尺"
  },
  "历史价格趋势": [
    {"季度": "2024 Q1", "价格": "$510/平方英尺", "同比增长": "5.2%"},
    {"季度": "2024 Q2", "价格": "$525/平方英尺", "同比增长": "5.8%"},
    {"季度": "2024 Q3", "价格": "$540/平方英尺", "同比增长": "6.3%"},
    {"季度": "2024 Q4", "价格": "$550/平方英尺", "同比增长": "6.8%"},
    {"季度": "2025 Q1", "价格": "$560/平方英尺", "同比增长": "7.5%"},
    {"季度": "2025 Q2", "价格": "$570/平方英尺", "同比增长": "8.0%"},
    {"季度": "2025 Q3", "价格": "$580/平方英尺", "同比增长": "8.5%"}
  ],
  "房型价格对比": [
    {"房型": "一居室", "平均价格": "$650/平方英尺", "同比增长": "9.2%", "需求指数": "高"},
    {"房型": "二居室", "平均价格": "$610/平方英尺", "同比增长": "8.8%", "需求指数": "高"},
    {"房型": "三居室", "平均价格": "$580/平方英尺", "同比增长": "8.5%", "需求指数": "中高"},
    {"房型": "四居室及以上", "平均价格": "$540/平方英尺", "同比增长": "7.2%", "需求指数": "中"}
  ],
  "未来预测": {
    "2025 Q4预测": "$590-$600/平方英尺",
    "2026 Q1预测": "$600-$615/平方英尺",
    "2026 Q2预测": "$610-$625/平方英尺",
    "2026 Q3预测": "$620-$640/平方英尺",
    "2026年整体增长率": "5-7%",
    "影响因素": [
      "利率环境",
      "远程工作趋势持续",
      "国际买家回归",
      "新建住宅供应量",
      "佛罗里达州税收政策"
    ]
  }
}`,i=`<line-chart-data>
{
  "title": "迈阿密三居室房价趋势 (2024-2025)",
  "xAxis": ["2024 Q1", "2024 Q2", "2024 Q3", "2024 Q4", "2025 Q1", "2025 Q2", "2025 Q3"],
  "series": [
    {
      "name": "平均价格 ($/平方英尺)",
      "data": [510, 525, 540, 550, 560, 570, 580]
    }
  ]
}
</line-chart-data>`):l.toLowerCase().includes("纽约")&&l.toLowerCase().includes("东京")&&(l.toLowerCase().includes("租金")||l.toLowerCase().includes("回报"))?(o="纽约与东京租金回报率对比分析报告",e="纽约的平均租金回报率为3.8%，而东京为4.2%。东京的租金回报率在过去5年保持相对稳定，而纽约则有所下降（从2020年的4.5%）。东京的租金市场受到更严格的租赁法规保护，波动性较小，而纽约的租金则受到更多市场因素影响。",s=`{
  "租金回报率概览": {
    "纽约当前租金回报率": "3.8%",
    "东京当前租金回报率": "4.2%",
    "全球平均租金回报率": "3.9%",
    "北美平均租金回报率": "4.0%",
    "亚太平均租金回报率": "4.1%",
    "数据来源": "Global Rental Yield Index 2025, Urban Property Investment Report"
  },
  "城市详细对比": [
    {
      "指标": "当前租金回报率",
      "纽约": "3.8%",
      "东京": "4.2%",
      "差异": "+0.4%（东京更高）"
    },
    {
      "指标": "2020年租金回报率",
      "纽约": "4.5%",
      "东京": "4.3%",
      "差异": "-0.2%（纽约更高）"
    },
    {
      "指标": "5年变化趋势",
      "纽约": "下降 (-0.7%)",
      "东京": "稳定 (-0.1%)",
      "差异": "纽约下降更明显"
    },
    {
      "指标": "平均月租金（2居室）",
      "纽约": "$3,850",
      "东京": "$2,100",
      "差异": "-$1,750（东京更低）"
    },
    {
      "指标": "平均房产价格（2居室）",
      "纽约": "$1,215,000",
      "东京": "$600,000",
      "差异": "-$615,000（东京更低）"
    },
    {
      "指标": "租赁市场稳定性",
      "纽约": "中",
      "东京": "高",
      "差异": "东京更稳定"
    }
  ],
  "纽约区域租金回报率": [
    {"区域": "曼哈顿", "回报率": "3.2%", "趋势": "下降", "风险评级": "中低"},
    {"区域": "布鲁克林", "回报率": "3.9%", "趋势": "稳定", "风险评级": "中"},
    {"区域": "皇后区", "回报率": "4.3%", "趋势": "上升", "风险评级": "中"},
    {"区域": "布朗克斯", "回报率": "4.8%", "趋势": "上升", "风险评级": "中高"},
    {"区域": "斯塔滕岛", "回报率": "4.5%", "趋势": "稳定", "风险评级": "中"}
  ],
  "东京区域租金回报率": [
    {"区域": "中央区", "回报率": "3.8%", "趋势": "稳定", "风险评级": "低"},
    {"区域": "港区", "回报率": "3.6%", "趋势": "稳定", "风险评级": "低"},
    {"区域": "新宿区", "回报率": "4.3%", "趋势": "稳定", "风险评级": "低"},
    {"区域": "涩谷区", "回报率": "4.1%", "趋势": "稳定", "风险评级": "低"},
    {"区域": "周边区域", "回报率": "4.7%", "趋势": "上升", "风险评级": "中低"}
  ],
  "影响因素分析": {
    "纽约": [
      "市场波动性较高",
      "租赁法规变化频繁",
      "供需关系受经济周期影响明显",
      "国际投资者情绪波动",
      "新建住宅供应不足"
    ],
    "东京": [
      "严格且稳定的租赁法规",
      "人口结构变化缓慢",
      "经济政策连续性强",
      "租户保护政策完善",
      "长期租约文化"
    ]
  },
  "投资者建议": [
    "纽约：关注新兴区域如布鲁克林和皇后区，回报率更高",
    "东京：优先考虑周边区域，价格较低但回报率更高",
    "纽约：短期投资者需警惕市场波动",
    "东京：适合长期稳定收益的投资者",
    "两市均应关注交通便利性，是租金溢价的关键因素"
  ]
}`,i=`<bar-chart-data>
{
  "title": "纽约与东京租金回报率比较 (2020-2025)",
  "xAxis": ["2020", "2021", "2022", "2023", "2024", "2025"],
  "series": [
    {
      "name": "纽约",
      "data": [4.5, 4.3, 4.1, 4.0, 3.9, 3.8]
    },
    {
      "name": "东京",
      "data": [4.3, 4.3, 4.2, 4.2, 4.1, 4.2]
    }
  ]
}
</bar-chart-data>`):l.toLowerCase().includes("趋势")&&l.toLowerCase().includes("5年")?(o="2020-2025年迈阿密房地产市场趋势分析报告",e="过去5年（2020-2025）迈阿密房地产价格呈现强劲上涨趋势，累计涨幅达到32%。2020年疫情初期短暂下跌后，从2021年开始加速上涨，特别是高端住宅和水景房产。2023年出现短暂调整，但2024-2025年又恢复增长。远程工作趋势和税收优惠政策是推动这一增长的主要因素。",s=`{
  "市场概览": {
    "市场": "迈阿密房地产",
    "时间范围": "2020-2025",
    "累计涨幅": "32%",
    "年均增长率": "5.7%",
    "波动性指数": "中高",
    "市场周期阶段": "成熟增长期",
    "数据来源": "Miami Real Estate Association, Global Property Trends 2025"
  },
  "年度价格指数": [
    {"年份": "2020", "价格指数": 100, "同比变化": "-2.5%", "市场状态": "疫情影响，短暂下跌"},
    {"年份": "2021", "价格指数": 108, "同比变化": "+8.0%", "市场状态": "开始加速上涨"},
    {"年份": "2022", "价格指数": 118, "同比变化": "+9.3%", "市场状态": "持续上涨"},
    {"年份": "2023", "价格指数": 122, "同比变化": "+3.4%", "市场状态": "短暂调整"},
    {"年份": "2024", "价格指数": 127, "同比变化": "+4.1%", "市场状态": "恢复增长"},
    {"年份": "2025", "价格指数": 132, "同比变化": "+3.9%", "市场状态": "稳定增长"}
  ],
  "季度详细数据": [
    {"季度": "2023 Q1", "价格指数": 119, "环比变化": "+0.8%", "成交量": "中"},
    {"季度": "2023 Q2", "价格指数": 120, "环比变化": "+0.8%", "成交量": "中"},
    {"季度": "2023 Q3", "价格指数": 121, "环比变化": "+0.8%", "成交量": "中低"},
    {"季度": "2023 Q4", "价格指数": 122, "环比变化": "+0.8%", "成交量": "中低"},
    {"季度": "2024 Q1", "价格指数": 123, "环比变化": "+0.8%", "成交量": "中"},
    {"季度": "2024 Q2", "价格指数": 125, "环比变化": "+1.6%", "成交量": "中高"},
    {"季度": "2024 Q3", "价格指数": 126, "环比变化": "+0.8%", "成交量": "高"},
    {"季度": "2024 Q4", "价格指数": 127, "环比变化": "+0.8%", "成交量": "高"},
    {"季度": "2025 Q1", "价格指数": 129, "环比变化": "+1.6%", "成交量": "高"},
    {"季度": "2025 Q2", "价格指数": 130, "环比变化": "+0.8%", "成交量": "中高"},
    {"季度": "2025 Q3", "价格指数": 131, "环比变化": "+0.8%", "成交量": "中高"},
    {"季度": "2025 Q4", "价格指数": 132, "环比变化": "+0.8%", "成交量": "中"}
  ],
  "房产类型表现": [
    {"类型": "高端住宅", "5年累计涨幅": "38%", "年均增长": "6.6%", "需求趋势": "强劲", "投资评级": "A"},
    {"类型": "水景房产", "5年累计涨幅": "42%", "年均增长": "7.3%", "需求趋势": "强劲", "投资评级": "A+"},
    {"类型": "中档公寓", "5年累计涨幅": "30%", "年均增长": "5.4%", "需求趋势": "稳定", "投资评级": "B+"},
    {"类型": "普通住宅", "5年累计涨幅": "25%", "年均增长": "4.6%", "需求趋势": "稳定", "投资评级": "B"},
    {"类型": "商业地产", "5年累计涨幅": "18%", "年均增长": "3.4%", "需求趋势": "波动", "投资评级": "C+"}
  ],
  "区域表现对比": [
    {"区域": "迈阿密海滩", "5年累计涨幅": "45%", "年均增长": "7.7%", "需求趋势": "强劲", "投资评级": "A+"},
    {"区域": "布里克尔", "5年累计涨幅": "40%", "年均增长": "7.0%", "需求趋势": "强劲", "投资评级": "A"},
    {"区域": "珊瑚礁", "5年累计涨幅": "35%", "年均增长": "6.2%", "需求趋势": "稳定上升", "投资评级": "A-"},
    {"区域": "市中心", "5年累计涨幅": "33%", "年均增长": "5.9%", "需求趋势": "稳定", "投资评级": "B+"},
    {"区域": "温伍德", "5年累计涨幅": "38%", "年均增长": "6.6%", "需求趋势": "快速上升", "投资评级": "A-"},
    {"区域": "小哈瓦那", "5年累计涨幅": "28%", "年均增长": "5.1%", "需求趋势": "稳定", "投资评级": "B"},
    {"区域": "北迈阿密", "5年累计涨幅": "22%", "年均增长": "4.1%", "需求趋势": "缓慢上升", "投资评级": "B-"}
  ],
  "主要驱动因素": [
    "远程工作趋势持续化",
    "税收优惠政策吸引高净值人群",
    "生活质量与气候优势",
    "国际买家回归市场",
    "科技和金融行业扩张",
    "基础设施改善项目",
    "供应限制与土地稀缺"
  ],
  "风险因素": [
    "气候变化与海平面上升",
    "保险成本上升",
    "利率环境变化",
    "房产税潜在调整",
    "供应过剩风险（特定细分市场）",
    "国际政治经济不确定性"
  ]
}`,i=`<line-chart-data>
{
  "title": "迈阿密房地产价格指数 (2020-2025)",
  "xAxis": ["2020", "2021", "2022", "2023", "2024", "2025"],
  "series": [
    {
      "name": "价格指数 (2020=100)",
      "data": [100, 108, 118, 122, 127, 132]
    }
  ]
}
</line-chart-data>`):l.toLowerCase().includes("欧洲")&&l.toLowerCase().includes("最高")?(o="2025年欧洲城市租金回报率排名分析报告",e="欧洲租金回报率最高的城市是：1. 布达佩斯（匈牙利）：6.8%，2. 华沙（波兰）：6.2%，3. 布拉格（捷克）：5.7%，4. 里斯本（葡萄牙）：5.5%，5. 柏林（德国）：4.9%。东欧城市普遍提供更高的租金回报率，但也伴随着较高的市场波动性和政策风险。",s=`{
  "欧洲租金回报率概览": {
    "欧洲平均租金回报率": "4.3%",
    "西欧平均租金回报率": "3.8%",
    "东欧平均租金回报率": "5.9%",
    "南欧平均租金回报率": "5.1%",
    "北欧平均租金回报率": "4.0%",
    "数据来源": "European Rental Yield Report 2025, Global Property Investment Index"
  },
  "欧洲租金回报率排名": [
    {
      "城市": "布达佩斯",
      "国家": "匈牙利",
      "回报率": "6.8%",
      "风险评级": "中高",
      "市场特点": ["价格相对较低", "投资门槛低", "政策不确定性"]
    },
    {
      "城市": "华沙",
      "国家": "波兰",
      "回报率": "6.2%",
      "风险评级": "中",
      "市场特点": ["经济增长强劲", "外国投资增加", "市场规模扩大"]
    },
    {
      "城市": "布拉格",
      "国家": "捷克",
      "回报率": "5.7%",
      "风险评级": "中",
      "市场特点": ["旅游业带动", "历史文化吸引力", "供应有限"]
    },
    {
      "城市": "里斯本",
      "国家": "葡萄牙",
      "回报率": "5.5%",
      "风险评级": "中低",
      "市场特点": ["黄金签证计划", "宜居城市", "国际买家兴趣"]
    },
    {
      "城市": "柏林",
      "国家": "德国",
      "回报率": "4.9%",
      "风险评级": "低",
      "市场特点": ["稳定性高", "租赁法规严格", "长期增长潜力"]
    }
  ],
  "完整城市排名": [
    {"排名": 1, "城市": "布达佩斯", "国家": "匈牙利", "回报率": "6.8%", "风险评级": "中高"},
    {"排名": 2, "城市": "华沙", "国家": "波兰", "回报率": "6.2%", "风险评级": "中"},
    {"排名": 3, "城市": "布拉格", "国家": "捷克", "回报率": "5.7%", "风险评级": "中"},
    {"排名": 4, "城市": "里斯本", "国家": "葡萄牙", "回报率": "5.5%", "风险评级": "中低"},
    {"排名": 5, "城市": "柏林", "国家": "德国", "回报率": "4.9%", "风险评级": "低"},
    {"排名": 6, "城市": "布加勒斯特", "国家": "罗马尼亚", "回报率": "6.5%", "风险评级": "高"},
    {"排名": 7, "城市": "索菲亚", "国家": "保加利亚", "回报率": "6.0%", "风险评级": "高"},
    {"排名": 8, "城市": "雅典", "国家": "希腊", "回报率": "5.3%", "风险评级": "中高"},
    {"排名": 9, "城市": "马德里", "国家": "西班牙", "回报率": "5.0%", "风险评级": "中低"},
    {"排名": 10, "城市": "曼彻斯特", "国家": "英国", "回报率": "4.8%", "风险评级": "中"},
    {"排名": 11, "城市": "汉堡", "国家": "德国", "回报率": "4.7%", "风险评级": "低"},
    {"排名": 12, "城市": "米兰", "国家": "意大利", "回报率": "4.6%", "风险评级": "中"},
    {"排名": 13, "城市": "阿姆斯特丹", "国家": "荷兰", "回报率": "4.2%", "风险评级": "低"},
    {"排名": 14, "城市": "维也纳", "国家": "奥地利", "回报率": "4.0%", "风险评级": "低"},
    {"排名": 15, "城市": "巴黎", "国家": "法国", "回报率": "3.8%", "风险评级": "低"},
    {"排名": 16, "城市": "伦敦", "国家": "英国", "回报率": "3.5%", "风险评级": "低"},
    {"排名": 17, "城市": "日内瓦", "国家": "瑞士", "回报率": "3.2%", "风险评级": "极低"},
    {"排名": 18, "城市": "摩纳哥", "国家": "摩纳哥", "回报率": "2.8%", "风险评级": "极低"}
  ],
  "区域风险分析": {
    "东欧": {
      "平均回报率": "5.9%",
      "风险等级": "中高",
      "风险因素": [
        "政治不稳定性",
        "法规变化频繁",
        "货币波动风险",
        "经济发展不均衡",
        "法律体系不完善"
      ],
      "机会因素": [
        "高回报率",
        "价格增长潜力大",
        "经济快速发展",
        "欧盟资金支持",
        "基础设施改善"
      ]
    },
    "西欧": {
      "平均回报率": "3.8%",
      "风险等级": "低",
      "风险因素": [
        "回报率较低",
        "价格已处高位",
        "税收负担重",
        "租赁法规严格",
        "增长空间有限"
      ],
      "机会因素": [
        "市场稳定性高",
        "法律体系完善",
        "政治环境稳定",
        "流动性好",
        "长期保值能力强"
      ]
    },
    "南欧": {
      "平均回报率": "5.1%",
      "风险等级": "中",
      "风险因素": [
        "经济波动性",
        "部分国家债务问题",
        "季节性需求波动",
        "政策变化风险",
        "某些地区过度依赖旅游"
      ],
      "机会因素": [
        "较高回报率",
        "生活质量吸引力",
        "投资者签证计划",
        "旅游业带动",
        "价格仍有上升空间"
      ]
    }
  },
  "投资建议": {
    "风险偏好型投资者": [
      "布达佩斯、华沙等东欧城市提供最高回报",
      "关注大学城和新兴商业区",
      "考虑短期租赁策略以最大化收益",
      "分散投资于多个城市以降低风险"
    ],
    "平衡型投资者": [
      "布拉格、里斯本等城市提供良好的风险回报比",
      "结合长期和短期租赁策略",
      "关注交通便利的中等价位区域",
      "考虑新兴但已有稳定基础的区域"
    ],
    "保守型投资者": [
      "柏林、维也纳等西欧城市提供稳定回报",
      "专注于长期租赁市场",
      "优先考虑市中心和成熟社区",
      "关注有严格租户保护法的市场"
    ]
  }
}`,i=`<bar-chart-data>
{
  "title": "欧洲城市租金回报率排名 (2025)",
  "xAxis": ["布达佩斯", "华沙", "布拉格", "里斯本", "柏林"],
  "series": [
    {
      "name": "租金回报率 (%)",
      "data": [6.8, 6.2, 5.7, 5.5, 4.9]
    }
  ]
}
</bar-chart-data>`):l.toLowerCase().includes("预测")||l.toLowerCase().includes("2026")?(o="2026年柏林房地产市场预测分析报告",e="2026年柏林房价预测显示将上涨4.3-5.8%。这一增长率低于2021-2023年的高峰期，但仍高于德国平均水平。柏林市中心和热门区域如Mitte和Prenzlauer Berg预计涨幅更高（6-7%），而外围区域如Spandau预计涨幅较低（3-4%）。影响因素包括持续的住房短缺、低利率环境和国际投资者兴趣。",s=`{
  "城市": "柏林",
  "年份": "2026",
  "整体预测涨幅": "4.3-5.8%",
  "区域预测": {
    "市中心": "6-7%",
    "Mitte": "6.5%",
    "Prenzlauer Berg": "6.2%",
    "Kreuzberg": "5.8%",
    "Friedrichshain": "5.5%",
    "Neukölln": "4.8%",
    "Spandau": "3-4%"
  },
  "主要影响因素": [
    "住房供应短缺",
    "低利率环境",
    "国际投资者兴趣",
    "城市发展规划",
    "人口增长"
  ],
  "历史对比": {
    "2021-2023": "年均7.5%",
    "2024-2025": "年均5.2%",
    "2026预测": "4.3-5.8%"
  },
  "数据来源": "Berlin Property Forecast 2026, European Housing Market Analysis"
}`,i=`<line-chart-data>
{
  "title": "柏林房价预测 (2025-2026)",
  "xAxis": ["2025 Q1", "2025 Q2", "2025 Q3", "2025 Q4", "2026 Q1", "2026 Q2", "2026 Q3", "2026 Q4"],
  "series": [
    {
      "name": "预测价格指数 (2025=100)",
      "data": [97, 99, 100, 101, 103, 104, 105, 106]
    }
  ]
}
</line-chart-data>`):(o="2025年全球房地产市场概览分析报告",e="根据全球房产数据分析，2025年全球主要房地产市场呈现差异化发展趋势。北美市场整体稳健，欧洲市场温和增长，亚太市场表现不一。投资者应关注城市发展规划、基础设施投资和人口流动趋势，这些因素将显著影响未来2-3年的市场表现。",s=`{
  "全球房地产市场概览 (2025)": {
    "北美市场": {
      "整体表现": "稳健增长",
      "平均价格涨幅": "4.8%",
      "热点城市": ["迈阿密", "奥斯汀", "纳什维尔"],
      "主要驱动因素": ["远程工作趋势", "科技行业扩张", "生活质量考量"]
    },
    "欧洲市场": {
      "整体表现": "温和增长",
      "平均价格涨幅": "3.2%",
      "热点城市": ["里斯本", "柏林", "华沙"],
      "主要驱动因素": ["低利率环境", "城市更新项目", "国际投资"]
    },
    "亚太市场": {
      "整体表现": "表现不一",
      "平均价格涨幅": "2.9%",
      "热点城市": ["新加坡", "悉尼", "东京"],
      "主要驱动因素": ["经济复苏", "政策调整", "跨境投资回暖"]
    }
  },
  "投资建议": [
    "关注城市发展规划和基础设施投资",
    "评估人口流动趋势和就业市场变化",
    "考虑长期持有策略，规避短期波动",
    "分散投资组合，平衡风险与回报"
  ],
  "数据来源": "Global Property Market Outlook 2025, International Real Estate Investment Report"
}`,i=`<line-chart-data>
{
  "title": "全球主要地区房产价格指数 (2020-2025)",
  "xAxis": ["2020", "2021", "2022", "2023", "2024", "2025"],
  "series": [
    {
      "name": "北美",
      "data": [100, 105, 112, 118, 124, 130]
    },
    {
      "name": "欧洲",
      "data": [100, 103, 108, 112, 116, 120]
    },
    {
      "name": "亚太",
      "data": [100, 102, 106, 110, 114, 117]
    }
  ]
}
</line-chart-data>`),{title:o,conclusion:e,structured:s,visualization:i,analysis:"基于历史数据分析，我们观察到该市场呈现出明显的周期性波动，主要受到经济政策、人口迁移和基础设施投资等因素的影响。近期数据显示，投资者情绪正逐步恢复，特别是在高端住宅和商业地产领域。"}};return(l,e)=>(n(),a("div",X,[t("div",Z,[t("div",{class:R(["sidebar",{collapsed:!b.value}])},[t("div",tt,[e[7]||(e[7]=t("h2",null,"首页",-1)),t("button",{class:"toggle-sidebar-btn",onClick:q},[t("i",{class:R(["fas",b.value?"fa-chevron-left":"fa-chevron-right"])},null,2)])]),b.value?(n(),a("div",et,[...e[8]||(e[8]=[B('<div class="history-section" data-v-5dc3ed51><h3 data-v-5dc3ed51>历史对话</h3><div class="history-list" data-v-5dc3ed51><div class="history-item" data-v-5dc3ed51><i class="fas fa-comment-alt" data-v-5dc3ed51></i><span data-v-5dc3ed51>2025年Q3迈阿密三居室的平均每平方英尺价格是多少？</span></div><div class="history-item" data-v-5dc3ed51><i class="fas fa-comment-alt" data-v-5dc3ed51></i><span data-v-5dc3ed51>比较纽约和东京的租金回报率</span></div><div class="history-item" data-v-5dc3ed51><i class="fas fa-comment-alt" data-v-5dc3ed51></i><span data-v-5dc3ed51>过去5年迈阿密房地产价格趋势如何？</span></div><div class="history-item" data-v-5dc3ed51><i class="fas fa-comment-alt" data-v-5dc3ed51></i><span data-v-5dc3ed51>欧洲哪些城市的租金回报率最高？</span></div><div class="history-item" data-v-5dc3ed51><i class="fas fa-comment-alt" data-v-5dc3ed51></i><span data-v-5dc3ed51>2026年柏林房价预测是多少？</span></div><div class="history-item" data-v-5dc3ed51><i class="fas fa-comment-alt" data-v-5dc3ed51></i><span data-v-5dc3ed51>新加坡对外国人购房有哪些限制政策？</span></div><div class="history-item" data-v-5dc3ed51><i class="fas fa-comment-alt" data-v-5dc3ed51></i><span data-v-5dc3ed51>如何评估一个地区的房产投资潜力？</span></div><div class="history-item" data-v-5dc3ed51><i class="fas fa-comment-alt" data-v-5dc3ed51></i><span data-v-5dc3ed51>伦敦和巴黎哪个城市的房产升值空间更大？</span></div></div></div><div class="new-chat-section" data-v-5dc3ed51><button class="new-chat-btn" data-v-5dc3ed51><i class="fas fa-plus" data-v-5dc3ed51></i> 新对话 </button></div>',2)])])):Q("",!0)],2),t("div",st,[t("div",{class:"chat-messages",ref_key:"chatContainerRef",ref:g},[f.value.length===0?(n(),a("div",at,[e[10]||(e[10]=t("h2",null,"欢迎使用 Global PropAI 智能助手",-1)),e[11]||(e[11]=t("p",null,"您可以询问任何关于房地产市场、投资策略、价格趋势的问题",-1)),t("div",nt,[e[9]||(e[9]=t("h3",null,"您可以尝试这些问题：",-1)),t("div",it,[t("div",{class:"question-chip",onClick:e[0]||(e[0]=s=>w("2025年Q3迈阿密三居室的平均每平方英尺价格是多少？"))}," 2025年Q3迈阿密三居室的平均每平方英尺价格是多少？ "),t("div",{class:"question-chip",onClick:e[1]||(e[1]=s=>w("比较纽约和东京的租金回报率"))}," 比较纽约和东京的租金回报率 "),t("div",{class:"question-chip",onClick:e[2]||(e[2]=s=>w("过去5年迈阿密房地产价格趋势如何？"))}," 过去5年迈阿密房地产价格趋势如何？ "),t("div",{class:"question-chip",onClick:e[3]||(e[3]=s=>w("欧洲哪些城市的租金回报率最高？"))}," 欧洲哪些城市的租金回报率最高？ "),t("div",{class:"question-chip",onClick:e[4]||(e[4]=s=>w("2026年柏林房价预测是多少？"))}," 2026年柏林房价预测是多少？ "),t("div",{class:"question-chip",onClick:e[5]||(e[5]=s=>w("新加坡对外国人购房有哪些限制政策？"))}," 新加坡对外国人购房有哪些限制政策？ ")])])])):(n(),a(y,{key:1},[(n(!0),a(y,null,h(f.value,s=>(n(),a("div",{key:s.id,class:"qa-container"},[s.type==="user"?(n(),a("div",ot,[t("h2",null,r(s.content),1),t("div",dt,[t("span",lt,r(L(s.timestamp)),1)])])):s.type==="assistant"?(n(),a("div",rt,[t("div",ct,[t("div",ut,[e[12]||(e[12]=t("h3",{class:"column-title"},"结论汇总",-1)),t("div",vt,[t("p",null,r(s.content.conclusion),1)])]),t("div",pt,[e[13]||(e[13]=t("h3",{class:"column-title"},"数据/资料",-1)),t("div",yt,[s.content.structured.includes("{")?(n(),a("div",mt,[(n(!0),a(y,null,h(T(s.content.structured),(i,o)=>(n(),a("div",{key:o,class:"structured-table-section"},[t("h3",ht,r(i.title),1),i.type==="key-value"?(n(),a("div",ft,[t("table",wt,[(n(!0),a(y,null,h(i.rows,(d,c)=>(n(),a("tr",{key:c},[d.type==="subheader"?(n(),a("th",_t,r(d.key),1)):d.type==="data"?(n(),a(y,{key:1},[t("td",bt,r(d.key),1),t("td",kt,r(d.value),1)],64)):Q("",!0)]))),128))])])):i.type==="array-objects"?(n(),a("div",Qt,[t("table",$t,[t("thead",null,[t("tr",null,[(n(!0),a(y,null,h(i.columns,(d,c)=>(n(),a("th",{key:c},r(d),1))),128))])]),t("tbody",null,[(n(!0),a(y,null,h(i.items,(d,c)=>(n(),a("tr",{key:c},[(n(!0),a(y,null,h(i.columns,(u,_)=>(n(),a("td",{key:_},r(Array.isArray(d[u])?d[u].join(", "):d[u]),1))),128))]))),128))])])])):i.type==="array-simple"?(n(),a("div",gt,[t("ul",At,[(n(!0),a(y,null,h(i.items,(d,c)=>(n(),a("li",{key:c},r(d),1))),128))])])):i.type==="simple"?(n(),a("div",St,[t("div",Ct,r(i.rows[0].value),1)])):Q("",!0)]))),128))])):(n(),a("pre",xt,r(s.content.structured),1))])])]),t("div",It,[t("div",Dt,[t("span",Lt,r(L(s.timestamp)),1)]),e[14]||(e[14]=B('<div class="answer-buttons" data-v-5dc3ed51><button class="action-btn" data-v-5dc3ed51><i class="far fa-copy" data-v-5dc3ed51></i></button><button class="action-btn" data-v-5dc3ed51><i class="far fa-thumbs-up" data-v-5dc3ed51></i></button><button class="action-btn" data-v-5dc3ed51><i class="far fa-thumbs-down" data-v-5dc3ed51></i></button></div>',1))])])):s.type==="error"?(n(),a("div",Rt,[t("p",null,r(s.content),1)])):Q("",!0)]))),128)),$.value?(n(),a("div",Bt,[...e[15]||(e[15]=[t("div",{class:"typing-indicator"},[t("span"),t("span"),t("span")],-1),t("p",null,"AI正在思考中...",-1)])])):Q("",!0)],64))],512),t("div",Mt,[t("div",Ot,[F(t("textarea",{ref_key:"inputRef",ref:k,"onUpdate:modelValue":e[6]||(e[6]=s=>v.value=s),placeholder:"输入您的问题...",onKeydown:U(J(A,["prevent"]),["enter"]),rows:"1"},null,40,Pt),[[H,v.value]]),t("div",Et,[e[17]||(e[17]=t("button",{class:"action-btn"},[t("i",{class:"fas fa-paperclip"})],-1)),e[18]||(e[18]=t("button",{class:"action-btn"},[t("i",{class:"fas fa-microphone"})],-1)),t("button",{class:"send-btn",onClick:A,disabled:!v.value.trim()||$.value},[...e[16]||(e[16]=[t("i",{class:"fas fa-paper-plane"},null,-1)])],8,Tt)])])])])])]))}},Kt=j(qt,[["__scopeId","data-v-5dc3ed51"]]);export{Kt as default};
