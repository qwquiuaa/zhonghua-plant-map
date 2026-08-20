// ============================================================
// 《中华植物研究地图》数据文件
// 省份名与 china_geo.json 中 properties.name 完全一致
// ============================================================

// 每个省份档案字段：
// name: 省份名
// emblem: 省花/代表植物
// family: 科属
// latin: 拉丁学名
// desc: 介绍
// image: 文生图提示词
// collected: 是否已收集（默认 false）
// hue: 该省徽章/色调用途的色相值(0-360)，用于中国风配色

window.PLANTS = {
  "浙江省": {
    emblem: "樟树",
    family: "樟科 · 樟属",
    latin: "Cinnamomum camphora",
    desc: "浙江的省树。常绿乔木，枝叶繁茂，全株含樟脑油，是江南庭荫与用材兼优的代表树种。",
    image: "traditional Chinese painting, camphor tree, Jiangnan style, ink wash",
    hue: 45
  },
  "江苏省": {
    emblem: "琼花",
    family: "忍冬科 · 荚蒾属",
    latin: "Viburnum macrocephalum",
    desc: "扬州琼花遗世独立，八朵白色瓣花围成一圈淡雅花盘，被称为‘天下无双’的奇花。",
    image: "traditional Chinese painting, snowball viburnum flower, white, Jiangsu",
    hue: 200
  },
  "上海市": {
    emblem: "白玉兰",
    family: "木兰科 · 木兰属",
    latin: "Magnolia denudata",
    desc: "上海市花。早春先花后叶，满树洁白如玉兰盏，象征上海敢为人先的开拓精神。",
    image: "traditional Chinese painting, white magnolia flower, Shanghai",
    hue: 0
  },
  "北京市": {
    emblem: "菊花",
    family: "菊科 · 菊属",
    latin: "Chrysanthemum morifolium",
    desc: "北京市花。金秋盛放，傲霜挺立，是京城气韵与文人风骨的经典符号。",
    image: "traditional Chinese painting, chrysanthemum, autumn, Beijing",
    hue: 40
  },
  "广东省": {
    emblem: "木棉花",
    family: "木棉科 · 木棉属",
    latin: "Bombax ceiba",
    desc: "广东省花。又称英雄树，早春火红之花挂满枝头，象征岭南的坚韧与热血。",
    image: "traditional Chinese painting, kapok flower, red, Guangdong",
    hue: 0
  },
  "福建省": {
    emblem: "榕树",
    family: "桑科 · 榕属",
    latin: "Ficus microcarpa",
    desc: "福建省树。独木成林，气根垂地，荫泽深厚，是八闽大地的守护者。",
    image: "traditional Chinese painting, banyan tree, Fujian",
    hue: 120
  },
  "云南省": {
    emblem: "云南山茶",
    family: "山茶科 · 山茶属",
    latin: "Camellia reticulata",
    desc: "云南‘八大名花’之首，花大色艳，红若朝霞，是高原上的王者之花。",
    image: "traditional Chinese painting, Yunnan camellia, red, Yunnan",
    hue: 350
  },
  "四川省": {
    emblem: "蜀葵",
    family: "锦葵科 · 蜀葵属",
    latin: "Alcea rosea",
    desc: "巴蜀沃土孕育的高大花木，一丈红，翠杆紫花，盛开在川西的夏。",
    image: "traditional Chinese painting, hollyhock, Sichuan, red-purple",
    hue: 320
  },
  "湖北省": {
    emblem: "梅",
    family: "蔷薇科 · 杏属",
    latin: "Armeniaca mume",
    desc: "武汉东湖磨山梅花闻名天下，凌寒独秀，暗香浮动，是荆楚报春的信号。",
    image: "traditional Chinese painting, plum blossom, winter, Hubei",
    hue: 10
  },
  "湖南省": {
    emblem: "荷",
    family: "睡莲科 · 莲属",
    latin: "Nelumbo nucifera",
    desc: "‘湘莲’甲天下，映日荷花别样红，出淤泥而不染，如湖湘风骨。",
    image: "traditional Chinese painting, lotus flower, Hunan, pink",
    hue: 330
  },
  "河南省": {
    emblem: "牡丹",
    family: "毛茛科 · 芍药属",
    latin: "Paeonia suffruticosa",
    desc: "洛阳牡丹甲天下，花中之王，雍容华贵，是中原千年繁盛的表征。",
    image: "traditional Chinese painting, peony, Luoyang, colorful",
    hue: 10
  },
  "山东省": {
    emblem: "月季",
    family: "蔷薇科 · 蔷薇属",
    latin: "Rosa chinensis",
    desc: "山东省花。四时不谢，常伴齐鲁山海，是孔孟之乡的温婉与坚韧。",
    image: "traditional Chinese painting, Chinese rose, Shandong",
    hue: 0
  },
  "陕西省": {
    emblem: "石榴花",
    family: "石榴科 · 石榴属",
    latin: "Punica granatum",
    desc: "西安石榴花火红如焰，串串灯笼，点缀秦川，是汉唐遗韵的鲜活注脚。",
    image: "traditional Chinese painting, pomegranate flower, Shaanxi, red",
    hue: 350
  },
  "新疆维吾尔自治区": {
    emblem: "雪莲",
    family: "菊科 · 风毛菊属",
    latin: "Saussurea involucrata",
    desc: "天山雪线上绽放的圣洁之花，不畏严寒，是新疆高原的生命奇迹。",
    image: "traditional Chinese painting, snow lotus flower, Tianshan, Xinjiang",
    hue: 210
  },
  "西藏自治区": {
    emblem: "格桑花",
    family: "菊科 · 秋英属",
    latin: "Cosmos sulphureus",
    desc: "高原上缤纷的格桑花，是藏族人民心中的吉祥花，象征幸福与美好。",
    image: "traditional Chinese painting, cosmos flower, plateau, Tibet",
    hue: 280
  },
  "黑龙江省": {
    emblem: "丁香",
    family: "木犀科 · 丁香属",
    latin: "Syringa oblata",
    desc: "哈尔滨的市花，五月丁香满城，紫色浪漫，是黑土地的温婉芬芳。",
    image: "traditional Chinese painting, lilac flower, purple, Heilongjiang",
    hue: 260
  },
  "吉林省": {
    emblem: "君子兰",
    family: "石蒜科 · 君子兰属",
    latin: "Clivia miniata",
    desc: "长春君子兰名扬四海，叶片碧绿挺秀，橙红之花，花中君子。",
    image: "traditional Chinese painting, clivia flower, orange, Jilin",
    hue: 30
  },
  "辽宁省": {
    emblem: "天女木兰",
    family: "木兰科 · 木兰属",
    latin: "Magnolia sieboldii",
    desc: "辽宁特有珍稀树种，花开如雪，香气清雅，是北国仙女的化身。",
    image: "traditional Chinese painting, Siebold's magnolia, white, Liaoning",
    hue: 0
  },
  "内蒙古自治区": {
    emblem: "马蔺",
    family: "鸢尾科 · 鸢尾属",
    latin: "Iris lactea",
    desc: "草原上随处可见的蓝紫色鸢尾，根系深固，是荒漠草原的绿色守望者。",
    image: "traditional Chinese painting, blue iris, grassland, Inner Mongolia",
    hue: 230
  },
  "山西省": {
    emblem: "国槐",
    family: "豆科 · 槐属",
    latin: "Styphnolobium japonicum",
    desc: "山西省树。古槐荫被三晋，枝叶扶疏，承载着黄土地上的岁月与乡愁。",
    image: "traditional Chinese painting, locust tree, Shanxi",
    hue: 90
  },
  "河北省": {
    emblem: "太平花",
    family: "绣球花科 · 山梅花属",
    latin: "Philadelphus pekinensis",
    desc: "石家庄市花，洁白繁花似云似雪，寓意太平盛世，安和吉祥。",
    image: "traditional Chinese painting, mock orange flower, white, Hebei",
    hue: 0
  },
  "安徽省": {
    emblem: "黄山松",
    family: "松科 · 松属",
    latin: "Pinus hwangshanensis",
    desc: "黄山奇松破石而出，百折不挠，是皖南山水间最壮阔的生命姿态。",
    image: "traditional Chinese painting, Huangshan pine, Anhui, jagged rocks",
    hue: 150
  },
  "江西省": {
    emblem: "杜鹃",
    family: "杜鹃花科 · 杜鹃属",
    latin: "Rhododendron simsii",
    desc: "‘井冈杜鹃’漫山红遍，映山红之艳，是赣鄱大地的革命底色与春天。",
    image: "traditional Chinese painting, azalea, red hills, Jiangxi",
    hue: 0
  },
  "广西壮族自治区": {
    emblem: "桂花",
    family: "木犀科 · 木犀属",
    latin: "Osmanthus fragrans",
    desc: "广西‘桂林’之名源于桂树，金秋桂花十里飘香，是八桂大地的芬芳基石。",
    image: "traditional Chinese painting, osmanthus flower, gold, Guangxi",
    hue: 45
  },
  "贵州省": {
    emblem: "珙桐",
    family: "蓝果树科 · 珙桐属",
    latin: "Davidia involucrata",
    desc: "‘植物界的大熊猫’，鸽子花迎风起舞，是贵州深山的活化石。",
    image: "traditional Chinese painting, dove tree flower, white, Guizhou",
    hue: 0
  },
  "海南省": {
    emblem: "三角梅",
    family: "紫茉莉科 · 叶子花属",
    latin: "Bougainvillea spectabilis",
    desc: "海南省花。姹紫嫣红点缀椰风海韵，是热带海岛最奔放的生命色彩。",
    image: "traditional Chinese painting, bougainvillea, colorful, Hainan",
    hue: 320
  },
  "甘肃省": {
    emblem: "沙棘",
    family: "胡颓子科 · 沙棘属",
    latin: "Hippophae rhamnoides",
    desc: "西北戈壁的‘黄宝石’，橙红果实缀满枝头，顽强守护着陇原水土。",
    image: "traditional Chinese painting, sea buckthorn berries, Gansu, orange",
    hue: 35
  },
  "青海省": {
    emblem: "青海云杉",
    family: "松科 · 云杉属",
    latin: "Picea crassifolia",
    desc: "青藏高原东缘的高大针叶林，苍劲挺拔，是高原生态的绿色屏障。",
    image: "traditional Chinese painting, spruce forest, Qinghai, plateau",
    hue: 140
  },
  "宁夏回族自治区": {
    emblem: "枸杞",
    family: "茄科 · 枸杞属",
    latin: "Lycium barbarum",
    desc: "‘塞上江南’红枸杞，艳红如玛瑙，药食同源，是宁夏的红色名片。",
    image: "traditional Chinese painting, goji berries, red, Ningxia",
    hue: 0
  },
  "重庆市": {
    emblem: "山茶",
    family: "山茶科 · 山茶属",
    latin: "Camellia japonica",
    desc: "重庆市市花。红山茶凌冬而开，热烈而坚韧，如同山城人民的性情。",
    image: "traditional Chinese painting, red camellia, Chongqing",
    hue: 350
  },
  "天津市": {
    emblem: "西府海棠",
    family: "蔷薇科 · 苹果属",
    latin: "Malus micromalus",
    desc: "天津市花。娇俏红蕊立枝头，春风吹过津门，落英缤纷如胭脂雨。",
    image: "traditional Chinese painting, crabapple flower, pink, Tianjin",
    hue: 330
  },
  "台湾省": {
    emblem: "蝴蝶兰",
    family: "兰科 · 蝴蝶兰属",
    latin: "Phalaenopsis aphrodite",
    desc: "宝岛台湾的兰花名片，花形如蝶，雅致飘逸，是东南海上的芬芳。",
    image: "traditional Chinese painting, phalaenopsis orchid, Taiwan",
    hue: 280
  },
  "香港特别行政区": {
    emblem: "洋紫荆",
    family: "豆科 · 羊蹄甲属",
    latin: "Bauhinia blakeana",
    desc: "香港区花。片片紫荆似心形绿叶间的胭脂，开满维港之畔。",
    image: "traditional Chinese painting, bauhinia flower, Hong Kong, purple",
    hue: 300
  },
  "澳门特别行政区": {
    emblem: "白莲花",
    family: "睡莲科 · 莲属",
    latin: "Nelumbo nucifera",
    desc: "澳门区花。亭亭出水，皎洁无瑕，象征澳门的纯净与祥和。",
    image: "traditional Chinese painting, white lotus, Macau",
    hue: 0
  }
};