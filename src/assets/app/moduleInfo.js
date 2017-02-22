/*
* 设置模板的搜索的关键字及其信息
*/
define(function(){
	var moduleInfo = {
		'yxhd':{
			keywords:'YX yx yanxuan YANXUAN YXHD yxhd 严选 严选头部',
			shortCut:'严选头部',
			data: {
				'img': 'http://mimg.127.net/hz/uploader/20161011/14761714486151576.jpg',
				'zoom': 'http://mimg.127.net/hz/uploader/20161011/14761714485361568.jpg',
				'value': 'yxhd',
				'type': 'yxhd',
				'suitWeb': true,
				'suitH5': true
			}
		},
		'yxft':{
			keywords:'YX yx yanxuan YANXUAN YXFT yxft 严选 严选尾部',
			shortCut:'严选尾部',
			data: {
				'img': 'http://mimg.127.net/hz/uploader/20161011/14761714485131565.jpg',
				'zoom': 'http://mimg.127.net/hz/uploader/20161011/14761714485881573.jpg',
				'value': 'yxft',
				'type': 'yxft',
				'suitWeb': true,
				'suitH5': true
			}
		},
		'YX_S_M_35FD':{
			keywords:'35FD 35fd YX_S_M_35FD yx_s_m_35fd banner Banner 移动端 铜板街活动 移动端可适配banner',
			shortCut:'移动端可适配banner',
			data: {
				'img': 'https://mimg.127.net/hz/uploader/20170112/14842229407800115.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20170112/14842229407800115.jpg',
				'value': 'YX_S_M_35FD',
				'type': 'YX_S_M_35FD',
				'suitWeb': false,
				'suitH5': true
			}
		},
		'YX_S_M_BF3A':{
			keywords:'BF3A bf3a YX_S_M_BF3A yx_s_m_bf3a banner Banner tab Tab 移动端 铜板街活动 移动端可适配banner 移动端可适配tab 移动端tab',
			shortCut:'移动端tab',
			data: {
				'img': 'https://mimg.127.net/hz/uploader/20170112/14842028042970033.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20170112/14842028042970033.jpg',
				'value': 'YX_S_M_BF3A',
				'type': 'YX_S_M_BF3A',
				'suitWeb': false,
				'suitH5': true
			}
		},
		'YX_S_M_D9D0':{
			keywords:'D9D0 d9d0 YX_S_M_D9D0 yx_s_m_d09d0 banner Banner 券码 移动端 铜板街活动 移动端可适配banner 移动端可配置的券 移动端可配置券码banner',
			shortCut:'移动端可配置券码banner',
			data: {
				'img': 'https://mimg.127.net/hz/uploader/20170112/14841931301530023.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20170112/14841931301530023.jpg',
				'value': 'YX_S_M_D9D0',
				'type': 'YX_S_M_D9D0',
				'suitWeb': false,
				'suitH5': true
			}
		},
		'YX_S_M_EA3D':{
			keywords:'EA3D ea3d YX_S_M_EA3D yx_s_m_ea3d banner Banner 移动端 移动端适配banner 空白栏 移动端可配置的空白栏 空白栏（可修改色值高度）',
			shortCut:'空白栏（可修改色值高度）',
			data: {
				'img': 'https://mimg.127.net/hz/uploader/20170109/14839664630630182.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20170109/14839664630630182.jpg',
				'value': 'YX_S_M_EA3D',
				'type': 'YX_S_M_EA3D',
				'suitWeb': false,
				'suitH5': true
			}
		},
		'YX_S_M_CE2D':{
			keywords:'CE2D ce2d YX_S_M_CE2D yx_s_m_ce2d banner Banner pc端 PC端banner 空白栏 pc端可配置的空白栏 空白栏（可修改色值高度）pc',
			shortCut:'空白栏（可修改色值高度）pc',
			data: {
				'img': 'https://mimg.127.net/hz/uploader/20170109/14839647158100097.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20170109/14839647158100097.jpg',
				'value': 'YX_S_M_CE2D',
				'type': 'YX_S_M_CE2D',
				'suitWeb': true,
				'suitH5': false
			}
		},
		'YX_S_M_A86B':{
			keywords:'A86B a86b YX_S_M_A86B yx_s_m_a86b banner Banner pc端 移动端 PC端banner 移动端banner 可适配的banner',
			shortCut:'可适配的banner',
			data: {
				'img': 'https://mimg.127.net/hz/uploader/20161220/14822229722431545.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20161220/14822229722431545.jpg',
				'value': 'YX_S_M_A86B',
				'type': 'YX_S_M_A86B',
				'suitWeb': true,
				'suitH5': true
			}
		},
		'YX_S_M_EE29':{
			keywords:'EE29 ee29 YX_S_M_EE29 yx_s_m_ee29 banner Banner 移动端 移动端banner 可配置链接',
			shortCut:'移动端banner',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20161219/14821145858471145.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20161219/14821145858471145.jpg',
				'value': 'YX_S_M_EE29',
				'type': 'YX_S_M_EE29',
				'suitWeb': false,
				'suitH5': true
			}
		},
		'YX_S_M_4FDB':{
			keywords:'4FDB 4fdb YX_S_M_4FDB yx_s_m_4fdb banner Banner 移动端 移动端banner 空白栏 移动端带有文案的空白栏',
			shortCut:'移动端带有文案的空白栏',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20170120/14849011447760139.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20170120/14849011447760139.jpg',
				'value': 'YX_S_M_4FDB',
				'type': 'YX_S_M_4FDB',
				'suitWeb': false,
				'suitH5': true
			}
		},
		'YX_S_M_07DA':{
			keywords:'07DA 07da YX_S_M_07DA yx_s_m_07da banner Banner 移动端 移动端banner 有钱 网易有钱 有钱配置模块 有钱配置基金模块',
			shortCut:'有钱配置基金模块',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20161219/14821507028151318.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20161219/14821507028151318.jpg',
				'value': 'YX_S_M_07DA',
				'type': 'YX_S_M_07DA',
				'suitWeb': false,
				'suitH5': true
			}
		},
		'YX_S_M_BFA7':{
			keywords:'BFA7 bfa7 YX_S_M_BFA7 yx_s_m_bfa7 banner Banner 移动端 移动端banner 有钱 网易有钱 有钱配置模块 活动规则 相关阅读 有钱配置相关阅读模块',
			shortCut:'有钱配置相关阅读模块',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20161220/14822033145081424.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20161220/14822033145081424.jpg',
				'value': 'YX_S_M_BFA7',
				'type': 'YX_S_M_BFA7',
				'suitWeb': false,
				'suitH5': true
			}
		},
		'YX_S_M_51E1':{
			keywords:'51E1 51e1 YX_S_M_51E1 yx_s_m_51e1 banner Banner 移动端 移动端banner 查看更多 移动端按钮 移动端按钮模块',
			shortCut:'移动端按钮模块',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20161216/14818742150761006.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20161216/14818742150761006.jpg',
				'value': 'YX_S_M_51E1',
				'type': 'YX_S_M_51E1',
				'suitWeb': true,
				'suitH5': true
			}
		},
		'YX_S_M_3DA7':{
			keywords:'3DA7 3da7 YX_S_M_3DA7 yx_s_m_3da7 banner Banner 移动端 pc端 pc端banner 移动端banner 可适配banner 云音乐',
			shortCut:'可适配banner',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20161226/14827198248382663.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20161226/14827198248382663.jpg',
				'value': 'YX_S_M_3DA7',
				'type': 'YX_S_M_3DA7',
				'suitWeb': true,
				'suitH5': true
			}
		},
		'YX_S_M_97D8':{
			keywords:'97D8 97d8 YX_S_M_97D8 yx_s_m_97d8 banner Banner 移动端 pc端 pc端banner 移动端banner 空白栏 pc端空白栏 移动端空白栏',
			shortCut:'pc端空白栏',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20161205/14809066191120355.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20161205/14809066191120355.jpg',
				'value': 'YX_S_M_97D8',
				'type': 'YX_S_M_97D8',
				'suitWeb': true,
				'suitH5': true
			}
		},
		'YX_S_M_0AA8':{
			keywords:'0AA8 0aa8 YX_S_M_0AA8 yx_s_m_0aa8 banner Banner 移动端 pc端 pc端banner 移动端banner title 设置文案 可设置文案 可设置文案的banner 可设置文案的title 标题文案',
			shortCut:'标题文案',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20161205/14809121475660356.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20161205/14809121475660356.jpg',
				'value': 'YX_S_M_0AA8',
				'type': 'YX_S_M_0AA8',
				'suitWeb': true,
				'suitH5': true
			}
		},
		'YX_S_M_19AB':{
			keywords:'19AB 19ab YX_S_M_19AB yx_s_m_19ab banner Banner 移动端 pc端 pc端banner 移动端banner 可适配banner 通栏banner（1920*420/640*auto）',
			shortCut:'通栏banner（1920*420/640*auto）',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20161226/14827198248232662.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20161226/14827198248232662.jpg',
				'value': 'YX_S_M_19AB',
				'type': 'YX_S_M_19AB',
				'suitWeb': true,
				'suitH5': true
			}
		}/*,
		'YX_S_M_6D5E':{
			keywords:'6D5E 6d5e YX_S_M_6D5E yx_s_m_6d5e banner Banner 移动端 pc端 pc端banner 移动端banner 可适配banner',
			shortCut:'可适配banner',
			data:{
				'img': 'http://mimg.127.net/hz/uploader/20161202/14806436916670873.jpg',
				'zoom': 'http://mimg.127.net/hz/uploader/20161202/14806436916670873.jpg',
				'value': 'YX_S_M_6D5E',
				'type': 'YX_S_M_6D5E',
				'suitWeb': true,
				'suitH5': true
			}
		}*//*,
		'YX_S_M_AFA4':{
			keywords:'AFA4 afa4 YX_S_M_AFA4 yx_s_m_afa4 banner Banner 移动端 pc端 pc端banner 移动端banner 可适配banner title 设置文案 可设置文案 可设置文案的banner 可设置文案的title',
			shortCut:'可设置文案的banner',
			data:{
				'img': 'http://mimg.127.net/hz/uploader/20161121/14797117654230219.jpg',
				'zoom': 'http://mimg.127.net/hz/uploader/20161121/14797117654230219.jpg',
				'value': 'YX_S_M_AFA4',
				'type': 'YX_S_M_AFA4',
				'suitWeb': true,
				'suitH5': true
			}
		}*/,
		'YX_S_M_73D7':{
			keywords:'73D7 73d7 YX_S_M_73D7 yx_s_m_73d7 banner Banner pc端 pc端banner',
			shortCut:'pc端banner',
			data:{
				'img': 'http://mimg.127.net/hz/uploader/20161117/14793539817441331.jpg',
				'zoom': 'http://mimg.127.net/hz/uploader/20161117/14793539817441331.jpg',
				'value': 'YX_S_M_73D7',
				'type': 'YX_S_M_73D7',
				'suitWeb': true,
				'suitH5': false
			}
		},
		'YX_S_M_0CE9':{
			keywords:'0CE9 0ce9 YX_S_M_0CE9 yx_s_m_0ce9 banner Banner pc端 pc端banner 可配置种类',
			shortCut:'pc端banner',
			data:{
				'img': 'http://mimg.127.net/hz/uploader/20161117/14793668815171343.jpg',
				'zoom': 'http://mimg.127.net/hz/uploader/20161117/14793668815171343.jpg',
				'value': 'YX_S_M_0CE9',
				'type': 'YX_S_M_0CE9',
				'suitWeb': true,
				'suitH5': false
			}
		},
		// 接入goods的商品组
		'YX_N_M_BCD0':{
			keywords:'BCD0 bcd0 YX_N_M_BCD0 YX_N_M_BCD0 yanxuan YANXUAN 严选 商品 商品位 商品组 商品位模块 商品组模块 移动端 移动端商品组模块 铜板街活动 铜板街活动产出的移动端模块',
			shortCut:'铜板街活动产出的移动端模块',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20170209/14866118621490036.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20170209/14866118621490036.jpg',
				'value': 'YX_N_M_BCD0',
				'type': 'YX_N_M_BCD0',
				'suitWeb': false,
				'suitH5': true
			}
		},
		'YX_N_M_CB4D':{
			keywords:'CB4D cb4d YX_N_M_CB4D yx_n_m_cb4d yanxuan YANXUAN 严选 商品 商品位 商品组 商品位模块 商品组模块 pc端 pc端商品组模块 严选家装节 严选家装节活动pc端模块 严选家装节样式1 商品池2-1 商品池2-1（配图320*640）',
			shortCut:'商品池2-1（配图320*640）',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20170110/14840499619080539.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20170110/14840499619080539.jpg',
				'value': 'YX_N_M_CB4D',
				'type': 'YX_N_M_CB4D',
				'suitWeb': true,
				'suitH5': false
			}
		},
		'YX_N_M_A4F1':{
			keywords:'A4F1 a4f1 YX_N_M_A4F1 yx_n_m_a4f1 yanxuan YANXUAN 严选 商品 商品位 商品组 商品位模块 商品组模块 pc端 pc端商品组模块 严选家装节 严选家装节活动pc端模块 严选家装节样式2 商品池2-2 商品池2-2（配图320*640）',
			shortCut:'商品池2-2（配图320*640）',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20170110/14840499034700538.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20170110/14840499034700538.jpg',
				'value': 'YX_N_M_A4F1',
				'type': 'YX_N_M_A4F1',
				'suitWeb': true,
				'suitH5': false
			}
		},
		'YX_N_M_64E0':{
			keywords:'64E0 64e0 YX_N_M_64E0 yx_n_m_64Ee0 yanxuan YANXUAN 严选 商品 商品位 商品组 商品位模块 商品组模块 pc端 pc端商品组模块 严选家装节 严选家装节活动pc端模块 严选家装节样式3 商品池3-1 商品池3-1（配图266*383）',
			shortCut:'商品池3-1（配图266*383）',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20170110/14840370665660387.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20170110/14840370665660387.jpg',
				'value': 'YX_N_M_64E0',
				'type': 'YX_N_M_64E0',
				'suitWeb': true,
				'suitH5': false
			}
		},
		'YX_N_M_D45D':{
			keywords:'D45D d45d YX_N_M_D45D yx_n_m_d45d yanxuan YANXUAN 严选 商品 商品位 商品组 商品位模块 商品组模块 pc端 pc端商品组模块 严选家装节 严选家装节活动pc端模块 严选家装节样式4 商品池3-2 商品池3-2（配图266*383）',
			shortCut:'商品池3-2（配图266*383）',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20170110/14840370379940386.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20170110/14840370379940386.jpg',
				'value': 'YX_N_M_D45D',
				'type': 'YX_N_M_D45D',
				'suitWeb': true,
				'suitH5': false
			}
		},
		'YX_N_M_BE90':{
			keywords:'BE90 be90 YX_N_M_BE90 yx_n_m_be90 yanxuan YANXUAN 严选 商品 商品位 商品组 商品位模块 商品组模块 pc端 pc端商品组模块 严选家装节 严选家装节活动pc端模块 严选家装节样式5 商品池4-1 商品池4-1（配图352*442）',
			shortCut:'商品池4-1（配图352*442）',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20170109/14839609227630065.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20170109/14839609227630065.jpg',
				'value': 'YX_N_M_BE90',
				'type': 'YX_N_M_BE90',
				'suitWeb': true,
				'suitH5': false
			}
		},
		'YX_N_M_77DE':{
			keywords:'77DE 77de YX_N_M_77DE yx_n_m_77de yanxuan YANXUAN 严选 商品 商品位 商品组 商品位模块 商品组模块 pc端 pc端商品组模块 严选家装节 严选家装节活动pc端模块 严选家装节样式6 商品池4-2 商品池4-1（配图352*442）',
			shortCut:'商品池4-2（配图352*442）',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20170109/14839540766420019.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20170109/14839540766420019.jpg',
				'value': 'YX_N_M_77DE',
				'type': 'YX_N_M_77DE',
				'suitWeb': true,
				'suitH5': false
			}
		},
		'YX_N_M_94FE':{
			keywords:'94FE 94fe YX_N_M_94FE yx_n_m_94fe yanxuan YANXUAN 严选 商品 商品位 商品组 商品位模块 商品组模块 移动端 移动端商品组模块 严选家装节 严选家装节活动产出的移动端模块 严选家装节样式7 商品池1-H5',
			shortCut:'商品池1-H5',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20170109/14839435087250039.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20170109/14839435087250039.jpg',
				'value': 'YX_N_M_94FE',
				'type': 'YX_N_M_94FE',
				'suitWeb': false,
				'suitH5': true
			}
		},
		'YX_N_M_B53B':{
			keywords:'B53B b53b YX_N_M_B53B yx_n_m_b53b yanxuan YANXUAN 严选 商品 商品位 商品组 商品位模块 商品组模块 pc端 pc端商品组模块 严选家装节 严选家装节活动pc端模块 商品池1-PC',
			shortCut:'商品池1-PC',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20170105/14836032681770101.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20170105/14836032681770101.jpg',
				'value': 'YX_N_M_B53B',
				'type': 'YX_N_M_B53B',
				'suitWeb': true,
				'suitH5': false
			}
		},
		'YX_N_M_B278':{
			keywords:'B278 b278 YX_N_M_B278 yx_n_m_b278 yanxuan YANXUAN 严选 商品 商品位 商品组 商品位模块 商品组模块 移动端 移动端商品组模块 厨房生活家 严选厨房生活家 严选厨房生活家活动产出的移动端模块 严选厨房生活家样式1',
			shortCut:'严选厨房生活家移动端样式1',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20161221/14823124571861834.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20161221/14823124571861834.jpg',
				'value': 'YX_N_M_B278',
				'type': 'YX_N_M_B278',
				'suitWeb': false,
				'suitH5': true
			}
		},
		'YX_N_M_C1C3':{
			keywords:'C1C3 c1c3 YX_N_M_C1C3 yx_n_m_c1c3 yanxuan YANXUAN 严选 商品 商品位 商品组 商品位模块 商品组模块 移动端 移动端商品组模块 厨房生活家 严选厨房生活家 严选厨房生活家活动产出的移动端模块 严选厨房生活家样式2',
			shortCut:'严选厨房生活家移动端样式2',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20161221/14823032926141800.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20161221/14823032926141800.jpg',
				'value': 'YX_N_M_C1C3',
				'type': 'YX_N_M_C1C3',
				'suitWeb': false,
				'suitH5': true
			}
		},
		'YX_N_M_FDC0':{
			keywords:'FDC0 fdc0 YX_N_M_FDC0 yx_n_m_fdc0 yanxuan YANXUAN 严选 商品 商品位 商品组 商品位模块 商品组模块 移动端 pc端 移动端商品组模块 pc端商品组模块 可适配商品组模块',
			shortCut:'可适配商品组模块',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20161216/14818543574380739.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20161216/14818543574380739.jpg',
				'value': 'YX_N_M_FDC0',
				'type': 'YX_N_M_FDC0',
				'suitWeb': true,
				'suitH5': true
			}
		},
		'YX_N_M_EAB5':{
			keywords:'EAB5 eab5 YX_N_M_EAB5 yx_n_m_eab5 yanxuan YANXUAN 严选 商品 商品位 商品组 商品位模块 商品组模块 pc端 pc端商品组模块',
			shortCut:'pc端商品组模块',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20161212/14815242485321232.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20161212/14815242485321232.jpg',
				'value': 'YX_N_M_EAB5',
				'type': 'YX_N_M_EAB5',
				'suitWeb': true,
				'suitH5': false
			}
		},
		'YX_N_M_ACBA':{
			keywords:'ACBA acba YX_N_M_ACBA yx_n_m_acba yanxuan YANXUAN 严选 商品 商品位 商品组 商品位模块 商品组模块 pc端 pc端商品组模块',
			shortCut:'pc端商品组模块',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20161209/14812666937120883.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20161209/14812666937120883.jpg',
				'value': 'YX_N_M_ACBA',
				'type': 'YX_N_M_ACBA',
				'suitWeb': true,
				'suitH5': false
			}
		},
		'YX_N_M_92C9':{
			keywords:'92C9 92c9 YX_N_M_92C9 yx_n_m_92c9 yanxuan YANXUAN 严选 商品 商品位 商品组 商品位模块 商品组模块 pc端 移动端 pc端商品组模块 移动端商品组模块 可适配商品组模块 商品池5',
			shortCut:'商品池5',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20161205/14809274258960399.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20161205/14809274258960399.jpg',
				'value': 'YX_N_M_92C9',
				'type': 'YX_N_M_92C9',
				'suitWeb': true,
				'suitH5': true
			}
		},
		'YX_N_M_46EB':{
			keywords:'46EB 46eb YX_N_M_46eb yx_n_m_92c9 yanxuan YANXUAN 严选 商品 商品位 商品组 商品位模块 商品组模块 pc端 移动端 pc端商品组模块 移动端商品组模块 可适配商品组模块',
			shortCut:'可适配商品组模块',
			data:{
				'img': 'http://mimg.127.net/hz/uploader/20161122/14797812303460424.jpg',
				'zoom': 'http://mimg.127.net/hz/uploader/20161122/14797812303460424.jpg',
				'value': 'YX_N_M_46EB',
				'type': 'YX_N_M_46EB',
				'suitWeb': true,
				'suitH5': true
			}
		},
		'YX_N_M_9BBD':{
			keywords:'9BBD 9bbd YX_N_M_9BBD yx_n_m_9bbd yanxuan YANXUAN 严选 商品 商品位 商品组 商品位模块 商品组模块 pc端 pc端商品组模块',
			shortCut:'pc端商品组模块',
			data:{
				'img': 'http://mimg.127.net/hz/uploader/20161102/14780522153243951.jpg',
				'zoom': 'http://mimg.127.net/hz/uploader/20161102/14780522153243951.jpg',
				'value': 'YX_N_M_9BBD',
				'type': 'YX_N_M_9BBD',
				'suitWeb': true,
				'suitH5': false
			}
		},
		'YX_N_M_2BE2':{
			keywords:'2BE2 2be2 YX_N_M_2BE2 yx_n_m_2be2 yanxuan YANXUAN 严选 商品 商品位 商品组 商品位模块 商品组模块 pc端 pc端商品组模块',
			shortCut:'pc端商品组模块',
			data:{
				'img': 'http://mimg.127.net/hz/uploader/20161102/14780522153353952.jpg',
				'zoom': 'http://mimg.127.net/hz/uploader/20161102/14780522153353952.jpg',
				'value': 'YX_N_M_2BE2',
				'type': 'YX_N_M_2BE2',
				'suitWeb': true,
				'suitH5': false
			}
		},
		'YX_N_M_7A5D':{
			keywords:'7A5D 7a5d YX_N_M_7A5D yx_n_m_7a5d yanxuan YANXUAN 严选 商品 商品位 商品组 商品位模块 商品组模块 pc端 pc端商品组模块',
			shortCut:'pc端商品组模块',
			data:{
				'img':'http://mimg.127.net/hz/uploader/20161102/14780522153453953.jpg',
				'zoom': 'http://mimg.127.net/hz/uploader/20161102/14780522153453953.jpg',
				'value': 'YX_N_M_7A5D',
				'type': 'YX_N_M_7A5D',
				'suitWeb': true,
				'suitH5': false
			}
		},
		'YX_N_M_A1C6':{
			keywords:'A1C6 a1c6 YX_N_M_A1C6 yx_n_m_a1c6 yanxuan YANXUAN 严选 商品 商品位 商品组 商品位模块 商品组模块 pc端 pc端商品组模块',
			shortCut:'pc端商品组模块',
			data:{
				'img':'http://mimg.127.net/hz/uploader/20161102/14780522153133950.jpg',
				'zoom': 'http://mimg.127.net/hz/uploader/20161102/14780522153133950.jpg',
				'value': 'YX_N_M_A1C6',
				'type': 'YX_N_M_A1C6',
				'suitWeb': true,
				'suitH5': false
			}
		},
		'YX_N_M_881B':{
			keywords:'881B 881b YX_N_M_881B yx_n_m_881b yanxuan YANXUAN 严选 商品 商品位 商品组 商品位模块 商品组模块 pc端 pc端商品组模块',
			shortCut:'pc端商品组模块',
			data:{
				'img':'http://mimg.127.net/hz/uploader/20161116/14792617349681175.jpg',
				'zoom': 'http://mimg.127.net/hz/uploader/20161116/14792617349681175.jpg',
				'value': 'YX_N_M_881B',
				'type': 'YX_N_M_881B',
				'suitWeb': true,
				'suitH5': false
			}
		},
		'YX_N_M_C6E9':{
			keywords:'C6E9 c6e9 YX_N_M_C6E9 yx_n_m_c6e9 yanxuan YANXUAN 严选 商品 商品位 商品组 商品位模块 商品组模块 pc端 pc端商品组模块',
			shortCut:'pc端商品组模块',
			data:{
				'img':'http://mimg.127.net/hz/uploader/20161128/14802985110610600.jpg',
				'zoom': 'http://mimg.127.net/hz/uploader/20161128/14802985110610600.jpg',
				'value': 'YX_N_M_C6E9',
				'type': 'YX_N_M_C6E9',
				'suitWeb': true,
				'suitH5': false
			}
		},
		'YX_N_M_DB08':{
			keywords:'DB08 db08 YX_N_M_DB08 yx_n_m_db08 yanxuan YANXUAN 严选 商品 商品位 商品组 商品位模块 商品组模块 pc端 pc端商品组模块',
			shortCut:'pc端商品组模块',
			data:{
				'img':'http://mimg.127.net/hz/uploader/20161128/14803040464190649.jpg',
				'zoom': 'http://mimg.127.net/hz/uploader/20161128/14803040464190649.jpg',
				'value': 'YX_N_M_DB08',
				'type': 'YX_N_M_DB08',
				'suitWeb': true,
				'suitH5': false
			}
		},
		'yx_n_m_20BC':{
			keywords:'20BC 20bc YX_S_M_20BC yx_s_m_20bc 移动端 pc端 活动规则 移动端活动规则模块 pc端活动规则模块 可适配活动规则模块',
			shortCut:'可适配活动规则模块',
			data:{
				'img': 'https://mimg.127.net/hz/uploader/20161221/14822859093801764.jpg',
				'zoom': 'https://mimg.127.net/hz/uploader/20161221/14822859093801764.jpg',
				'value': 'YX_S_M_20BC',
				'type': 'YX_S_M_20BC',
				'suitWeb': true,
				'suitH5': true
			}
		}
	};
	return moduleInfo;
});