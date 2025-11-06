<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 术语分类
const glossaryCategories = ref([
  { id: 'all', name: '全部术语' },
  { id: 'market', name: '市场指标' },
  { id: 'investment', name: '投资术语' },
  { id: 'finance', name: '金融术语' },
  { id: 'legal', name: '法律术语' },
  { id: 'property', name: '房产术语' }
])

// 当前选中的分类
const selectedCategory = ref('all')

// 切换分类
const changeCategory = (categoryId) => {
  selectedCategory.value = categoryId
}

// 字母索引
const alphabetIndex = ref(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'])

// 当前选中的字母
const selectedLetter = ref('all')

// 切换字母
const changeLetter = (letter) => {
  selectedLetter.value = letter
}

// 术语列表
const glossaryTerms = ref([
  // 市场指标
  {
    id: 1,
    term: 'Absorption Rate',
    chinese: '吸收率',
    category: 'market',
    definition: '市场在特定时间段内消化（出售或租赁）房产的速率。通常以月为单位表示，计算方式为：当前市场上的房产数量除以每月售出的房产数量。例如，如果市场上有100套房产，每月售出20套，则吸收率为5个月。吸收率低表示市场活跃，高则表示市场疲软。',
    firstLetter: 'A'
  },
  {
    id: 2,
    term: 'Appreciation',
    chinese: '增值',
    category: 'market',
    definition: '房产价值随时间增长的现象。增值可能由多种因素驱动，包括通货膨胀、供需变化、区域发展、基础设施改善等。房地产投资者通常寻求具有强劲增值潜力的市场，作为总回报的重要组成部分。',
    firstLetter: 'A'
  },
  {
    id: 3,
    term: 'Buyer\'s Market',
    chinese: '买方市场',
    category: 'market',
    definition: '市场供应超过需求的状态，给买家带来议价优势。买方市场的特征包括：库存增加、房产在市场上停留时间延长、价格下降或稳定、卖家更愿意接受条件和让步。在买方市场中，买家通常有更多选择和更强的谈判能力。',
    firstLetter: 'B'
  },
  {
    id: 4,
    term: 'Seller\'s Market',
    chinese: '卖方市场',
    category: 'market',
    definition: '市场需求超过供应的状态，给卖家带来议价优势。卖方市场的特征包括：库存减少、房产快速售出、价格上涨、多个买家竞争同一房产、卖家较少提供让步。在卖方市场中，卖家通常能以更高价格和更有利条件出售房产。',
    firstLetter: 'S'
  },
  {
    id: 5,
    term: 'Median Home Price',
    chinese: '房价中位数',
    category: 'market',
    definition: '特定市场或区域内所有房产价格的中间值。与平均价格不同，中位数不受极端高价或低价房产的影响，因此通常被认为是更准确的市场价格指标。例如，如果一个地区有5套房产，价格分别为10万、15万、20万、25万和100万美元，中位数为20万美元，而平均价为34万美元。',
    firstLetter: 'M'
  },
  {
    id: 6,
    term: 'Price-to-Rent Ratio',
    chinese: '价租比',
    category: 'market',
    definition: '房产价格与年租金收入的比率。计算方式为：房产价格除以年租金收入。例如，一套50万美元的房产，年租金收入为2.5万美元，价租比为20。较低的价租比（通常低于15）表明购买可能比租赁更具经济性，而较高的价租比则表明租赁可能更划算。投资者使用此指标评估市场是否被高估以及投资回报潜力。',
    firstLetter: 'P'
  },
  {
    id: 7,
    term: 'Housing Affordability Index',
    chinese: '住房负担能力指数',
    category: 'market',
    definition: '衡量典型家庭购买中等价位房产的能力。该指数考虑了房价、抵押贷款利率和家庭收入。指数值为100表示典型家庭恰好有足够收入购买中等价位房产；高于100表示负担能力更强，低于100表示负担能力较弱。这是评估市场健康状况和预测未来价格走势的重要指标。',
    firstLetter: 'H'
  },
  {
    id: 8,
    term: 'Days on Market (DOM)',
    chinese: '挂牌天数',
    category: 'market',
    definition: '房产从上市到售出所需的平均天数。较短的DOM表示市场活跃，需求强劲；较长的DOM则表示市场放缓或房产定价过高。不同类型和价格区间的房产通常有不同的DOM预期。投资者和分析师使用DOM趋势来评估市场方向和定价策略。',
    firstLetter: 'D'
  },
  
  // 投资术语
  {
    id: 9,
    term: 'Cap Rate (Capitalization Rate)',
    chinese: '资本化率',
    category: 'investment',
    definition: '衡量房地产投资回报率的指标，计算方式为：年净营业收入(NOI)除以房产价值或购买价格。例如，一处价值100万美元的房产，年净营业收入为8万美元，资本化率为8%。资本化率越高，投资回报潜力越大，但风险也可能更高。不同类型和地区的房产有不同的预期资本化率。',
    firstLetter: 'C'
  },
  {
    id: 10,
    term: 'Cash on Cash Return',
    chinese: '现金回报率',
    category: 'investment',
    definition: '衡量投资者实际投入现金与年现金流回报之间关系的指标。计算方式为：年现金流除以初始现金投资。例如，投资者为一处房产支付10万美元首付并获得1万美元年现金流，现金回报率为10%。这一指标特别适用于评估杠杆投资（使用抵押贷款）的回报情况。',
    firstLetter: 'C'
  },
  {
    id: 11,
    term: 'Gross Rental Yield',
    chinese: '总租金回报率',
    category: 'investment',
    definition: '房产年总租金收入与房产价值的比率。计算方式为：(年租金收入 ÷ 房产价值) × 100%。例如，一处价值50万美元的房产，年租金收入为3万美元，总租金回报率为6%。这是评估和比较不同房产投资潜力的快速指标，但未考虑运营成本和空置率。',
    firstLetter: 'G'
  },
  {
    id: 12,
    term: 'Net Rental Yield',
    chinese: '净租金回报率',
    category: 'investment',
    definition: '房产年净租金收入（扣除所有运营成本后）与房产价值的比率。计算方式为：(年净租金收入 ÷ 房产价值) × 100%。例如，一处价值50万美元的房产，年租金收入为3万美元，运营成本为1万美元，净租金回报率为4%。这比总租金回报率更准确地反映实际投资回报。',
    firstLetter: 'N'
  },
  {
    id: 13,
    term: 'ROI (Return on Investment)',
    chinese: '投资回报率',
    category: 'investment',
    definition: '投资获得的利润与投资成本的比率。在房地产中，ROI考虑租金收入、资本增值和税收优惠等所有回报来源。计算方式为：(总回报 ÷ 总投资) × 100%。例如，投资20万美元购买房产，一年后获得3万美元的总回报（租金收入加增值），ROI为15%。',
    firstLetter: 'R'
  },
  {
    id: 14,
    term: 'IRR (Internal Rate of Return)',
    chinese: '内部收益率',
    category: 'investment',
    definition: '一种考虑时间价值的投资回报率指标，将投资的所有未来现金流折现为现值的折现率。IRR考虑了投资的持有期、现金流时间分布和退出价值。IRR越高，投资越有吸引力。专业房地产投资者通常使用IRR比较不同投资机会，特别是对于长期持有的房产。',
    firstLetter: 'I'
  },
  {
    id: 15,
    term: '1031 Exchange',
    chinese: '1031置换',
    category: 'investment',
    definition: '美国税法条款，允许投资者将投资性房产出售所得延税置换为"类似"房产。这使投资者能够推迟支付资本利得税，将更多资金用于新投资。1031置换有严格的时间限制和规则：投资者必须在45天内确定替代房产，并在180天内完成交易。这是美国房地产投资者常用的税务策略。',
    firstLetter: 'O'
  },
  {
    id: 16,
    term: 'Value-Add Investment',
    chinese: '增值投资',
    category: 'investment',
    definition: '一种房地产投资策略，通过改善或优化现有房产来增加其价值和收入潜力。增值机会包括物理改善（翻新、升级设施）、运营改善（提高租金、降低成本）或重新定位（改变用途或目标租户）。这种策略通常适用于表现不佳但位置良好的房产，投资者通过专业知识和资本投入创造额外价值。',
    firstLetter: 'V'
  },
  
  // 金融术语
  {
    id: 17,
    term: 'LTV (Loan-to-Value) Ratio',
    chinese: '贷款价值比',
    category: 'finance',
    definition: '贷款金额与房产评估价值的比率。例如，一处价值100万美元的房产，贷款75万美元，LTV为75%。较低的LTV通常意味着贷款风险较低，可能获得更优惠的利率。大多数传统抵押贷款要求LTV不超过80%，否则可能需要购买私人抵押贷款保险(PMI)。',
    firstLetter: 'L'
  },
  {
    id: 18,
    term: 'DSCR (Debt Service Coverage Ratio)',
    chinese: '债务覆盖率',
    category: 'finance',
    definition: '房产净营业收入(NOI)与债务服务（贷款本息支付）的比率。DSCR大于1表示房产产生足够收入支付债务；低于1表示收入不足以覆盖债务。例如，年NOI为12万美元，年债务服务为10万美元，DSCR为1.2。商业房地产贷款通常要求最低DSCR为1.25或更高。',
    firstLetter: 'D'
  },
  {
    id: 19,
    term: 'Amortization',
    chinese: '分期偿还',
    category: 'finance',
    definition: '通过定期等额支付逐渐偿还贷款本金的过程。在贷款初期，大部分付款用于支付利息；随着时间推移，越来越多的付款用于偿还本金。常见的住宅抵押贷款分期偿还期限为15年、20年或30年。商业房地产贷款可能有较短的分期偿还期但包含气球付款。',
    firstLetter: 'A'
  },
  {
    id: 20,
    term: 'Fixed-Rate Mortgage',
    chinese: '固定利率抵押贷款',
    category: 'finance',
    definition: '利率在整个贷款期限内保持不变的抵押贷款。这种贷款提供可预测性，使借款人能够确切知道每月还款额。固定利率抵押贷款是最常见的住宅贷款类型，特别适合计划长期持有房产或在低利率环境下的借款人。',
    firstLetter: 'F'
  },
  {
    id: 21,
    term: 'Adjustable-Rate Mortgage (ARM)',
    chinese: '可调整利率抵押贷款',
    category: 'finance',
    definition: '利率在初始固定期后根据特定指数定期调整的抵押贷款。常见类型包括5/1 ARM（5年固定后每年调整）或7/1 ARM（7年固定后每年调整）。ARM通常提供较低的初始利率，但承担未来利率可能上升的风险。适合计划短期持有房产或预期利率下降的借款人。',
    firstLetter: 'A'
  },
  {
    id: 22,
    term: 'Bridge Loan',
    chinese: '过桥贷款',
    category: 'finance',
    definition: '短期融资工具，用于"桥接"购买新房产与出售现有房产之间的资金缺口。过桥贷款通常期限为6个月至3年，利率高于传统抵押贷款。这种贷款使投资者能够抓住时间敏感的机会，但通常需要明确的退出策略（如再融资或出售）来偿还贷款。',
    firstLetter: 'B'
  },
  {
    id: 23,
    term: 'Mezzanine Financing',
    chinese: '夹层融资',
    category: 'finance',
    definition: '介于优先债务（如第一抵押贷款）和股权之间的融资形式。夹层融资通常无担保或由借款实体的股权担保，而非直接由房产担保。由于风险较高，夹层融资的利率高于传统贷款，通常还包括股权参与权或利润分成。这种融资常用于填补资本结构中的缺口，特别是在大型商业房地产交易中。',
    firstLetter: 'M'
  },
  {
    id: 24,
    term: 'Refinancing',
    chinese: '再融资',
    category: 'finance',
    definition: '用新贷款替换现有贷款的过程。房产所有者可能出于多种原因进行再融资：获取更低利率、缩短或延长贷款期限、从固定利率转为可调利率（或反之）、提取房产增值的现金（现金提取再融资）或合并多笔债务。再融资通常需要支付成交费用，因此重要的是计算再融资的长期节省是否超过这些成本。',
    firstLetter: 'R'
  },
  
  // 法律术语
  {
    id: 25,
    term: 'Deed',
    chinese: '契约',
    category: 'legal',
    definition: '转让房产所有权的法律文件。契约包含房产的法律描述、转让方（卖方）和受让方（买方）的信息，以及任何相关条件或限制。常见类型包括普通保证契约（提供最全面的所有权保证）、特殊保证契约（仅保证卖方持有期间的问题）和放弃契约（不提供任何保证）。契约必须正式记录在相应的政府机构才能生效。',
    firstLetter: 'D'
  },
  {
    id: 26,
    term: 'Easement',
    chinese: '地役权',
    category: 'legal',
    definition: '允许非业主使用他人房产特定部分的法律权利。常见类型包括公用事业地役权（允许公用事业公司接入设备）、通行地役权（允许通过他人房产）和景观地役权（保护视野）。地役权可能影响房产价值和使用，因此在购买前应仔细审查。地役权通常随房产转让，除非明确终止。',
    firstLetter: 'E'
  },
  {
    id: 27,
    term: 'Encumbrance',
    chinese: '产权负担',
    category: 'legal',
    definition: '影响房产所有权或限制其使用的权利或利益。常见类型包括留置权（债权人对房产的财务索赔）、地役权（他人使用房产的权利）、限制性契约（对房产使用的限制）和抵押（用房产作为贷款担保）。产权搜索和产权保险旨在发现和保护买家免受未披露产权负担的影响。',
    firstLetter: 'E'
  },
  {
    id: 28,
    term: 'Escrow',
    chinese: '托管',
    category: 'legal',
    definition: '由第三方代表交易双方持有资金或文件的安排。在房地产交易中，托管账户持有买方的定金，直到满足所有条件并完成交易。许多抵押贷款还包括托管账户，用于收集和支付房产税和保险费。托管提供安全保障，确保所有方面履行其义务后才释放资金。',
    firstLetter: 'E'
  },
  {
    id: 29,
    term: 'Title Insurance',
    chinese: '产权保险',
    category: 'legal',
    definition: '保护房产所有者和贷款机构免受产权缺陷影响的保险政策。产权保险保护范围包括未发现的留置权、产权缺陷、欺诈文件和错误记录。所有者产权保险保护买家的权益，贷款人产权保险保护抵押贷款机构的权益。与大多数保险不同，产权保险只需支付一次保费，提供持续保护直至房产出售或所有权转移。',
    firstLetter: 'T'
  },
  {
    id: 30,
    term: 'Zoning',
    chinese: '区划',
    category: 'legal',
    definition: '地方政府对土地使用的法规控制。区划法规定义了允许的用途（住宅、商业、工业等）、建筑密度、建筑高度、退缩要求和其他发展标准。了解房产的区划分类对投资者至关重要，特别是计划改变用途或进行开发的投资者。区划变更或特殊用途许可通常需要通过公共听证会和政府批准程序。',
    firstLetter: 'Z'
  },
  {
    id: 31,
    term: 'Due Diligence',
    chinese: '尽职调查',
    category: 'legal',
    definition: '买家在完成房产购买前进行的全面调查和验证过程。尽职调查通常包括物业检查、产权搜索、环境评估、区划验证、租约审查（对于投资性房产）和财务分析。大多数购买合同包括尽职调查期，允许买家在特定时间内进行这些调查，并在发现重大问题时退出交易或重新谈判条款。',
    firstLetter: 'D'
  },
  {
    id: 32,
    term: 'Eminent Domain',
    chinese: '征用权',
    category: 'legal',
    definition: '政府为公共用途征收私有财产的法律权力，需支付公平补偿。公共用途可能包括道路、学校、公用事业或城市更新项目。虽然业主不能阻止征用，但可以质疑补偿金额是否公平。征用权法律在不同国家和地区各不相同，但大多数要求政府证明公共需求并提供合理补偿。',
    firstLetter: 'E'
  },
  
  // 房产术语
  {
    id: 33,
    term: 'Fee Simple',
    chinese: '完全所有权',
    category: 'property',
    definition: '最完整的房产所有权形式，所有者拥有土地和其上所有改善物的无限权利。完全所有权允许所有者在法律和区划限制内使用、出售、租赁或遗赠房产。这是大多数住宅房产的标准所有权类型，与租赁权或生命产权等有限所有权形式相对。',
    firstLetter: 'F'
  },
  {
    id: 34,
    term: 'Leasehold',
    chinese: '租赁权',
    category: 'property',
    definition: '在特定期限内使用和占用房产的权利，而非拥有实际土地。租赁权所有者（承租人）向土地所有者（出租人）支付租金。租赁期可能从几年到99年或更长。常见于某些商业房产、度假胜地和特定地区（如夏威夷和英国部分地区）的住宅。租赁权价值随租约剩余期限减少而降低。',
    firstLetter: 'L'
  },
  {
    id: 35,
    term: 'Condominium (Condo)',
    chinese: '公寓',
    category: 'property',
    definition: '一种所有权形式，个人拥有单元内部空间的完全所有权，同时与其他单元所有者共同拥有公共区域（如走廊、电梯、游泳池）的部分所有权。公寓所有者支付管理费用于维护公共区域和设施。公寓通常由业主协会(HOA)管理，该协会制定规则并监督社区运营。',
    firstLetter: 'C'
  },
  {
    id: 36,
    term: 'Townhouse',
    chinese: '联排别墅',
    category: 'property',
    definition: '多层住宅单元，与一个或多个单元共享墙壁，但拥有独立入口。联排别墅通常包括单元本身和其下土地的所有权。与公寓类似，联排别墅通常有业主协会管理公共区域和设施，但HOA费用和限制通常少于公寓。联排别墅结合了独立住宅的部分优势和公寓的部分便利性。',
    firstLetter: 'T'
  },
  {
    id: 37,
    term: 'Single-Family Home',
    chinese: '独立住宅',
    category: 'property',
    definition: '独立建筑的住宅，不与其他住宅单元共享墙壁、屋顶或其他结构元素。独立住宅包括房屋和其所在土地的完全所有权。这种房产类型通常提供最大的隐私和控制权，但也需要所有者负责所有维护和维修。独立住宅可能位于有或没有HOA的社区中。',
    firstLetter: 'S'
  },
  {
    id: 38,
    term: 'Multi-Family Property',
    chinese: '多户住宅',
    category: 'property',
    definition: '包含多个独立住宅单元的建筑或建筑群。小型多户住宅（2-4个单元）通常归类为住宅房产，而较大的多户住宅（5个或更多单元）被视为商业房产。多户住宅是常见的房地产投资类型，提供多个租金收入来源和分散空置风险的优势。常见类型包括复式住宅、三联式住宅、四联式住宅和公寓楼。',
    firstLetter: 'M'
  },
  {
    id: 39,
    term: 'Commercial Property',
    chinese: '商业房产',
    category: 'property',
    definition: '用于商业用途而非住宅用途的房产。主要类型包括办公楼、零售空间、工业设施、多户住宅（5个或更多单元）、酒店和特殊用途房产。商业房产通常通过净租约出租，租户负责部分或全部房产费用（如税费、保险和维护）。商业房产投资通常需要更多专业知识和更大资本投入，但可能提供更高回报。',
    firstLetter: 'C'
  },
  {
    id: 40,
    term: 'Mixed-Use Property',
    chinese: '混合用途房产',
    category: 'property',
    definition: '结合多种用途的房产，如零售、办公、住宅或酒店。常见配置包括底层零售和上层住宅或办公空间。混合用途开发在城市环境中越来越受欢迎，支持"宜居、宜工、宜游"的理念。这种房产类型可以分散不同市场部门的风险，但管理可能更复杂，可能需要处理不同类型租户的需求。',
    firstLetter: 'M'
  }
])

// 根据当前分类和字母筛选术语
const filteredTerms = computed(() => {
  let result = glossaryTerms.value
  
  // 按分类筛选
  if (selectedCategory.value !== 'all') {
    result = result.filter(term => term.category === selectedCategory.value)
  }
  
  // 按字母筛选
  if (selectedLetter.value !== 'all') {
    result = result.filter(term => term.firstLetter === selectedLetter.value)
  }
  
  return result
})

// 搜索功能
const searchQuery = ref('')
const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return []
  
  const query = searchQuery.value.toLowerCase()
  return glossaryTerms.value.filter(term => 
    term.term.toLowerCase().includes(query) || 
    term.chinese.toLowerCase().includes(query) || 
    term.definition.toLowerCase().includes(query)
  )
})

// 展开/折叠状态
const expandedTerms = ref({})

// 切换展开/折叠状态
const toggleTerm = (termId) => {
  expandedTerms.value[termId] = !expandedTerms.value[termId]
}

// 检查是否展开
const isExpanded = (termId) => {
  return !!expandedTerms.value[termId]
}

// 检查字母是否有对应术语
const hasTermsForLetter = (letter) => {
  if (selectedCategory.value === 'all') {
    return glossaryTerms.value.some(term => term.firstLetter === letter)
  } else {
    return glossaryTerms.value.some(term => 
      term.category === selectedCategory.value && term.firstLetter === letter
    )
  }
}

// 获取字母对应的术语数量
const getTermCountForLetter = (letter) => {
  if (selectedCategory.value === 'all') {
    return glossaryTerms.value.filter(term => term.firstLetter === letter).length
  } else {
    return glossaryTerms.value.filter(term => 
      term.category === selectedCategory.value && term.firstLetter === letter
    ).length
  }
}
</script>

<template>
  <div class="glossary-page">
    <div class="container">
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="page-title">房地产术语表</h1>
          <p class="hero-description">
            探索全面的房地产术语表，帮助您理解市场分析、投资策略和法律文件中的专业术语。
            我们的术语表涵盖了市场指标、投资术语、金融概念、法律术语和房产类型等多个领域。
          </p>
          
          <div class="search-container">
            <div class="search-box">
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="搜索术语..."
                class="search-input"
              >
              <button class="search-btn">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 搜索结果 -->
      <section v-if="searchQuery.trim() && searchResults.length > 0" class="search-results-section">
        <div class="section-header">
          <h2 class="section-title">搜索结果</h2>
          <button class="clear-search" @click="searchQuery = ''">
            <i class="fas fa-times"></i> 清除搜索
          </button>
        </div>
        
        <div class="terms-list">
          <div 
            v-for="term in searchResults" 
            :key="term.id"
            class="term-item"
            :class="{ 'expanded': isExpanded(term.id) }"
          >
            <div class="term-header" @click="toggleTerm(term.id)">
              <div class="term-title">
                <h3>{{ term.term }}</h3>
                <span class="term-chinese">{{ term.chinese }}</span>
              </div>
              <div class="term-icon">
                <i :class="isExpanded(term.id) ? 'fas fa-minus' : 'fas fa-plus'"></i>
              </div>
            </div>
            <div v-if="isExpanded(term.id)" class="term-definition">
              <p>{{ term.definition }}</p>
              <div class="term-category">
                <span>分类：</span>
                <span class="category-tag" :class="term.category">
                  {{ glossaryCategories.find(c => c.id === term.category)?.name || term.category }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 无搜索结果提示 -->
      <section v-else-if="searchQuery.trim() && searchResults.length === 0" class="no-results-section">
        <div class="no-results-container">
          <div class="no-results-icon">
            <i class="fas fa-search"></i>
          </div>
          <h2>未找到匹配的术语</h2>
          <p>抱歉，我们没有找到与"{{ searchQuery }}"相关的术语。请尝试其他关键词或浏览下方的术语分类。</p>
          <button class="clear-search" @click="searchQuery = ''">
            清除搜索
          </button>
        </div>
      </section>
      
      <!-- 术语分类和列表 -->
      <section v-else class="glossary-content-section">
        <div class="glossary-categories">
          <button 
            v-for="category in glossaryCategories" 
            :key="category.id"
            class="category-btn"
            :class="{ 'active': selectedCategory === category.id }"
            @click="changeCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </div>
        
        <div class="alphabet-index">
          <button 
            class="letter-btn"
            :class="{ 'active': selectedLetter === 'all' }"
            @click="changeLetter('all')"
          >
            全部
          </button>
          <button 
            v-for="letter in alphabetIndex" 
            :key="letter"
            class="letter-btn"
            :class="{ 
              'active': selectedLetter === letter,
              'disabled': !hasTermsForLetter(letter)
            }"
            :disabled="!hasTermsForLetter(letter)"
            @click="changeLetter(letter)"
          >
            {{ letter }}
            <span v-if="hasTermsForLetter(letter)" class="letter-count">
              {{ getTermCountForLetter(letter) }}
            </span>
          </button>
        </div>
        
        <div class="terms-list">
          <div 
            v-for="term in filteredTerms" 
            :key="term.id"
            class="term-item"
            :class="{ 'expanded': isExpanded(term.id) }"
          >
            <div class="term-header" @click="toggleTerm(term.id)">
              <div class="term-title">
                <h3>{{ term.term }}</h3>
                <span class="term-chinese">{{ term.chinese }}</span>
              </div>
              <div class="term-icon">
                <i :class="isExpanded(term.id) ? 'fas fa-minus' : 'fas fa-plus'"></i>
              </div>
            </div>
            <div v-if="isExpanded(term.id)" class="term-definition">
              <p>{{ term.definition }}</p>
              <div class="term-category">
                <span>分类：</span>
                <span class="category-tag" :class="term.category">
                  {{ glossaryCategories.find(c => c.id === term.category)?.name || term.category }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 下载和分享 -->
      <section class="download-section">
        <div class="download-container">
          <div class="download-content">
            <h2>下载完整术语表</h2>
            <p>获取我们的完整房地产术语表PDF版本，随时随地查阅，无需网络连接。</p>
          </div>
          <div class="download-actions">
            <button class="download-btn">
              <i class="fas fa-file-pdf"></i> 下载PDF版本
            </button>
            <button class="share-btn">
              <i class="fas fa-share-alt"></i> 分享术语表
            </button>
          </div>
        </div>
      </section>
      
      <!-- 建议添加术语 -->
      <section class="suggest-term-section">
        <div class="suggest-container">
          <h2>建议添加术语</h2>
          <p>没有找到您要查询的术语？请告诉我们您希望添加到术语表的术语。</p>
          
          <div class="suggest-form">
            <div class="form-group">
              <label>术语（英文）</label>
              <input type="text" placeholder="例如：Cap Rate" class="form-input">
            </div>
            <div class="form-group">
              <label>术语（中文）</label>
              <input type="text" placeholder="例如：资本化率" class="form-input">
            </div>
            <div class="form-group">
              <label>术语定义或描述</label>
              <textarea placeholder="请提供该术语的定义或描述..." class="form-textarea"></textarea>
            </div>
            <div class="form-group">
              <label>您的电子邮箱（可选）</label>
              <input type="email" placeholder="用于通知您术语已添加" class="form-input">
            </div>
            <button class="submit-btn">
              提交术语建议
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.glossary-page {
  padding-top: 70px;
  padding-bottom: 50px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 英雄区域 */
.hero-section {
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  color: #fff;
  padding: 60px 0;
  border-radius: 12px;
  margin-bottom: 40px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  font-size: 36px;
  margin-bottom: 20px;
}

.hero-description {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 30px;
}

/* 搜索区域 */
.search-container {
  max-width: 600px;
  margin: 0 auto;
}

.search-box {
  display: flex;
}

.search-input {
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-radius: 8px 0 0 8px;
  font-size: 16px;
}

.search-input:focus {
  outline: none;
}

.search-btn {
  padding: 0 20px;
  background-color: #ff6b00;
  color: #fff;
  border: none;
  border-radius: 0 8px 8px 0;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-btn:hover {
  background-color: #e05e00;
}

/* 搜索结果区域 */
.search-results-section {
  margin-bottom: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 24px;
  color: #333;
}

.clear-search {
  background: none;
  border: none;
  color: #1890ff;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s;
}

.clear-search:hover {
  color: #40a9ff;
}

.clear-search i {
  margin-right: 5px;
}

/* 无搜索结果 */
.no-results-section {
  margin-bottom: 40px;
}

.no-results-container {
  background-color: #fff;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.no-results-icon {
  font-size: 60px;
  color: #ccc;
  margin-bottom: 20px;
}

.no-results-container h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 15px;
}

.no-results-container p {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.no-results-container .clear-search {
  padding: 10px 20px;
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.no-results-container .clear-search:hover {
  background-color: #40a9ff;
}

/* 术语内容区域 */
.glossary-content-section {
  margin-bottom: 60px;
}

.glossary-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.category-btn {
  padding: 10px 20px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.category-btn:hover {
  background-color: #e6f7ff;
  color: #1890ff;
}

.category-btn.active {
  background-color: #1890ff;
  color: #fff;
}

/* 字母索引 */
.alphabet-index {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 30px;
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.letter-btn {
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.letter-btn:first-child {
  width: auto;
  padding: 0 15px;
}

.letter-btn:hover:not(.disabled) {
  background-color: #e6f7ff;
  color: #1890ff;
}

.letter-btn.active {
  background-color: #1890ff;
  color: #fff;
}

.letter-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.letter-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ff6b00;
  color: #fff;
  font-size: 10px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 术语列表 */
.terms-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.term-item {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.term-item.expanded {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.term-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.term-title {
  display: flex;
  align-items: center;
}

.term-title h3 {
  font-size: 18px;
  color: #333;
  margin: 0;
  margin-right: 10px;
}

.term-chinese {
  font-size: 16px;
  color: #666;
}

.term-icon {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1890ff;
  transition: transform 0.3s;
}

.term-item.expanded .term-icon {
  transform: rotate(180deg);
}

.term-definition {
  padding: 0 20px 20px;
  border-top: 1px solid #f5f5f5;
}

.term-definition p {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.term-category {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #999;
}

.category-tag {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  margin-left: 5px;
  font-size: 12px;
}

.category-tag.market {
  background-color: #e6f7ff;
  color: #1890ff;
}

.category-tag.investment {
  background-color: #f6ffed;
  color: #52c41a;
}

.category-tag.finance {
  background-color: #fff7e6;
  color: #fa8c16;
}

.category-tag.legal {
  background-color: #f9f0ff;
  color: #722ed1;
}

.category-tag.property {
  background-color: #fff2e8;
  color: #fa541c;
}

/* 下载区域 */
.download-section {
  margin-bottom: 40px;
}

.download-container {
  background-color: #f5f5f5;
  border-radius: 12px;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.download-content h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.download-content p {
  font-size: 16px;
  color: #666;
  max-width: 500px;
}

.download-actions {
  display: flex;
  gap: 15px;
}

.download-btn,
.share-btn {
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
}

.download-btn i,
.share-btn i {
  margin-right: 10px;
}

.download-btn {
  background-color: #1890ff;
  color: #fff;
  border: none;
}

.download-btn:hover {
  background-color: #40a9ff;
}

.share-btn {
  background-color: #fff;
  color: #1890ff;
  border: 1px solid #1890ff;
}

.share-btn:hover {
  background-color: #e6f7ff;
}

/* 建议添加术语区域 */
.suggest-term-section {
  margin-bottom: 40px;
}

.suggest-container {
  background-color: #fff;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.suggest-container h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
}

.suggest-container p {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.suggest-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #1890ff;
}

.form-textarea {
  height: 120px;
  resize: vertical;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #40a9ff;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .download-container {
    flex-direction: column;
    text-align: center;
  }
  
  .download-content {
    margin-bottom: 20px;
  }
  
  .download-content p {
    max-width: none;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 0;
  }
  
  .page-title {
    font-size: 28px;
  }
  
  .hero-description {
    font-size: 16px;
  }
  
  .term-header {
    padding: 15px;
  }
  
  .term-title {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .term-title h3 {
    margin-right: 0;
    margin-bottom: 5px;
  }
  
  .download-actions {
    flex-direction: column;
    width: 100%;
  }
}

@media (max-width: 576px) {
  .search-box {
    flex-direction: column;
  }
  
  .search-input {
    border-radius: 8px;
    margin-bottom: 10px;
  }
  
  .search-btn {
    border-radius: 8px;
    width: 100%;
    padding: 10px;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .section-title {
    margin-bottom: 10px;
  }
  
  .alphabet-index {
    justify-content: center;
  }
}
</style>
