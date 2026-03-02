// Auto-generated from stats-1-6.json
window.__STATS_16__ = {
  "metadata": {
    "description": "PdMのAI利用を「与えた入力」×「期待する出力」の2軸で分析し、スレッド衛生を独立指標として記録",
    "axes": {
      "input_richness": {
        "label": "与えた入力",
        "values": {
          "material": "素材あり: コード・図・資料・画像など構造化された情報を渡した",
          "contextualized": "文脈あり: 背景説明や出力形式の指定を添えたが、構造化された素材は渡していない",
          "bare": "質問だけ: 質問文のみ。背景も素材も形式指定もなし"
        }
      },
      "expected_output": {
        "label": "期待する出力",
        "values": {
          "artifact": "成果物: コード・仕様書・文書・画像など、そのまま使える成果物",
          "understanding": "理解: 対話を通じて得る知識の深まり・判断材料・設計レビュー",
          "fact": "事実: 単発の事実・用語・手順・コードスニペット"
        }
      },
      "impact": {
        "label": "インパクトレベル",
        "description": "入力×出力の3×3マトリクスから導出",
        "values": {
          "co_creation": "共創: 素材×成果物、素材×理解、文脈×成果物。自分の素材や文脈を起点にAIと一緒に作るか設計を深める",
          "exploration": "探索: 文脈×理解、質問×理解。対話で知識を掘り下げる",
          "lookup": "検索: いずれか×事実。事実を確認する。1-2回で完結",
          "trial": "試行: 質問×成果物。指示だけで作らせる。成功率にばらつき"
        },
        "matrix": {
          "material|artifact": "co_creation",
          "material|understanding": "co_creation",
          "material|fact": "lookup",
          "contextualized|artifact": "co_creation",
          "contextualized|understanding": "exploration",
          "contextualized|fact": "lookup",
          "bare|artifact": "trial",
          "bare|understanding": "exploration",
          "bare|fact": "lookup"
        }
      }
    },
    "thread_hygiene": {
      "label": "スレッド衛生",
      "description": "1つのスレッド（セッション）に3つ以上のトピックが混在していればcontaminated",
      "total_sessions": 123,
      "clean_sessions": 104,
      "contaminated_sessions": 19,
      "clean_topic_count": 118,
      "contaminated_topic_count": 177
    },
    "total_topics": 295,
    "summary": {
      "input_richness": {
        "bare": 142,
        "contextualized": 78,
        "material": 75
      },
      "expected_output": {
        "fact": 133,
        "understanding": 90,
        "artifact": 72
      },
      "impact": {
        "lookup": 133,
        "exploration": 63,
        "co_creation": 85,
        "trial": 14
      },
      "thread_contamination": {
        "clean": 118,
        "contaminated": 177
      }
    },
    "cross_table": {
      "material": {
        "artifact": 41,
        "understanding": 27,
        "fact": 7
      },
      "contextualized": {
        "artifact": 17,
        "understanding": 31,
        "fact": 30
      },
      "bare": {
        "artifact": 14,
        "understanding": 32,
        "fact": 96
      }
    },
    "avg_query_count": {
      "material": {
        "artifact": 3,
        "understanding": 3.9,
        "fact": 1.7
      },
      "contextualized": {
        "artifact": 2,
        "understanding": 3.2,
        "fact": 1.5
      },
      "bare": {
        "artifact": 2.1,
        "understanding": 3.2,
        "fact": 1.4
      }
    },
    "topic_query_counts": {"1":1,"2":1,"3":1,"4":2,"5":1,"6":2,"7":2,"8":2,"9":1,"10":1,"11":3,"12":2,"13":1,"14":2,"15":1,"16":2,"17":1,"18":2,"19":1,"20":1,"21":1,"22":1,"23":1,"24":5,"25":2,"26":3,"27":1,"28":1,"29":2,"30":1,"31":2,"32":4,"33":3,"34":1,"35":1,"36":1,"37":1,"38":1,"39":1,"40":10,"41":1,"42":13,"43":10,"44":6,"45":4,"46":1,"47":1,"48":1,"49":5,"50":1,"51":3,"52":2,"53":1,"54":2,"55":1,"56":1,"57":2,"58":4,"59":1,"60":2,"61":4,"62":2,"63":1,"64":5,"65":2,"66":2,"67":2,"68":1,"69":1,"70":1,"71":5,"72":4,"73":2,"74":1,"75":3,"76":2,"77":2,"78":1,"79":2,"80":1,"81":3,"82":3,"83":2,"84":2,"85":1,"86":1,"87":1,"88":1,"89":1,"90":1,"91":2,"92":3,"93":2,"94":2,"95":2,"96":2,"97":1,"98":1,"99":4,"100":2,"101":1,"102":1,"103":8,"104":1,"105":6,"106":1,"107":3,"108":3,"109":3,"110":1,"111":3,"112":4,"113":3,"114":1,"115":1,"116":2,"117":1,"118":1,"119":3,"120":3,"121":2,"122":3,"123":2,"124":1,"125":1,"126":2,"127":1,"128":3,"129":5,"130":1,"131":4,"132":1,"133":2,"134":1,"135":1,"136":2,"137":1,"138":1,"139":3,"140":2,"141":1,"142":1,"143":1,"144":1,"145":13,"146":2,"147":1,"148":1,"149":1,"150":8,"151":2,"152":7,"153":2,"154":1,"155":1,"156":1,"157":1,"158":1,"159":2,"160":4,"161":1,"162":1,"163":1,"164":5,"165":3,"166":4,"167":1,"168":1,"169":1,"170":7,"171":1,"172":1,"173":2,"174":1,"175":1,"176":1,"177":1,"178":1,"179":2,"180":1,"181":4,"182":7,"183":2,"184":2,"185":5,"186":1,"187":2,"188":1,"189":1,"190":4,"191":11,"192":5,"193":2,"194":4,"195":1,"196":1,"197":1,"198":1,"199":9,"200":5,"201":17,"202":8,"203":2,"204":5,"205":2,"206":1,"207":12,"208":2,"209":1,"210":1,"211":1,"212":2,"213":1,"214":1,"215":2,"216":1,"217":1,"218":4,"219":1,"220":4,"221":5,"222":1,"223":3,"224":1,"225":1,"226":1,"227":1,"228":2,"229":1,"230":1,"231":1,"232":1,"233":1,"234":1,"235":3,"236":2,"237":5,"238":1,"239":3,"240":3,"241":2,"242":1,"243":3,"244":1,"245":3,"246":2,"247":5,"248":2,"249":1,"250":2,"251":1,"252":2,"253":1,"254":3,"255":2,"256":2,"257":1,"258":2,"259":2,"260":1,"261":2,"262":1,"263":7,"264":4,"265":1,"266":1,"267":2,"268":1,"269":5,"270":5,"271":3,"272":1,"273":2,"274":4,"275":1,"276":3,"277":1,"278":8,"279":1,"280":1,"281":1,"282":1,"283":1,"284":1,"285":5,"286":1,"287":1,"288":3,"289":2,"290":2,"291":1,"292":1,"293":1,"294":1,"295":1}
  },
  "topics": [
    {
      "id": 1,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 2,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 3,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 4,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": false
    },
    {
      "id": 5,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 6,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": false
    },
    {
      "id": 7,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": false
    },
    {
      "id": 8,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 9,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 10,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 11,
      "input_richness": "bare",
      "expected_output": "artifact",
      "impact": "trial",
      "thread_contaminated": false
    },
    {
      "id": 12,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": false
    },
    {
      "id": 13,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 14,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": false
    },
    {
      "id": 15,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 16,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": false
    },
    {
      "id": 17,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 18,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 19,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 20,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 21,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 22,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 23,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 24,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 25,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 26,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 27,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 28,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 29,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 30,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 31,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 32,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": false
    },
    {
      "id": 33,
      "input_richness": "contextualized",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 34,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 35,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 36,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 37,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 38,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 39,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 40,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 41,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 42,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 43,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 44,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 45,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 46,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 47,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 48,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 49,
      "input_richness": "contextualized",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 50,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 51,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 52,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 53,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 54,
      "input_richness": "contextualized",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 55,
      "input_richness": "contextualized",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 56,
      "input_richness": "material",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 57,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 58,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 59,
      "input_richness": "material",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 60,
      "input_richness": "contextualized",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 61,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 62,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 63,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 64,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 65,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 66,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 67,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 68,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 69,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 70,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 71,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 72,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 73,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 74,
      "input_richness": "material",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 75,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 76,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 77,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 78,
      "input_richness": "bare",
      "expected_output": "artifact",
      "impact": "trial",
      "thread_contaminated": true
    },
    {
      "id": 79,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 80,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 81,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 82,
      "input_richness": "bare",
      "expected_output": "artifact",
      "impact": "trial",
      "thread_contaminated": true
    },
    {
      "id": 83,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 84,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 85,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 86,
      "input_richness": "bare",
      "expected_output": "artifact",
      "impact": "trial",
      "thread_contaminated": true
    },
    {
      "id": 87,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 88,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 89,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 90,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 91,
      "input_richness": "contextualized",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 92,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 93,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 94,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 95,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 96,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 97,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 98,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 99,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 100,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 101,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 102,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 103,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 104,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 105,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": false
    },
    {
      "id": 106,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 107,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 108,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 109,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 110,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 111,
      "input_richness": "bare",
      "expected_output": "artifact",
      "impact": "trial",
      "thread_contaminated": false
    },
    {
      "id": 112,
      "input_richness": "bare",
      "expected_output": "artifact",
      "impact": "trial",
      "thread_contaminated": false
    },
    {
      "id": 113,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 114,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 115,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 116,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 117,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 118,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 119,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 120,
      "input_richness": "contextualized",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 121,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 122,
      "input_richness": "bare",
      "expected_output": "artifact",
      "impact": "trial",
      "thread_contaminated": false
    },
    {
      "id": 123,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 124,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 125,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 126,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 127,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 128,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 129,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 130,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 131,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 132,
      "input_richness": "contextualized",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 133,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 134,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 135,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 136,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 137,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 138,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": false
    },
    {
      "id": 139,
      "input_richness": "contextualized",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 140,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": false
    },
    {
      "id": 141,
      "input_richness": "contextualized",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 142,
      "input_richness": "contextualized",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 143,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 144,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 145,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 146,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": false
    },
    {
      "id": 147,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 148,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 149,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 150,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 151,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 152,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 153,
      "input_richness": "material",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 154,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 155,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 156,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 157,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 158,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 159,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 160,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 161,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 162,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 163,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 164,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 165,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 166,
      "input_richness": "material",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 167,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 168,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 169,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 170,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 171,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 172,
      "input_richness": "contextualized",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 173,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 174,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 175,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 176,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 177,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 178,
      "input_richness": "bare",
      "expected_output": "artifact",
      "impact": "trial",
      "thread_contaminated": false
    },
    {
      "id": 179,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 180,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 181,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 182,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 183,
      "input_richness": "material",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 184,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 185,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 186,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 187,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 188,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 189,
      "input_richness": "material",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 190,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 191,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 192,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 193,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 194,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 195,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 196,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 197,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 198,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 199,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 200,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": false
    },
    {
      "id": 201,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": false
    },
    {
      "id": 202,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": false
    },
    {
      "id": 203,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 204,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 205,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 206,
      "input_richness": "contextualized",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 207,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": false
    },
    {
      "id": 208,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": false
    },
    {
      "id": 209,
      "input_richness": "contextualized",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 210,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 211,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 212,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 213,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 214,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 215,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 216,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 217,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": false
    },
    {
      "id": 218,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 219,
      "input_richness": "contextualized",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 220,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 221,
      "input_richness": "bare",
      "expected_output": "artifact",
      "impact": "trial",
      "thread_contaminated": true
    },
    {
      "id": 222,
      "input_richness": "bare",
      "expected_output": "artifact",
      "impact": "trial",
      "thread_contaminated": true
    },
    {
      "id": 223,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 224,
      "input_richness": "bare",
      "expected_output": "artifact",
      "impact": "trial",
      "thread_contaminated": true
    },
    {
      "id": 225,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 226,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 227,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 228,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 229,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 230,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 231,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 232,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 233,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 234,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 235,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 236,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 237,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 238,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 239,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 240,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 241,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 242,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 243,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 244,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 245,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 246,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 247,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 248,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 249,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 250,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 251,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 252,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 253,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 254,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 255,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 256,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 257,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 258,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 259,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 260,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 261,
      "input_richness": "bare",
      "expected_output": "artifact",
      "impact": "trial",
      "thread_contaminated": false
    },
    {
      "id": 262,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 263,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 264,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 265,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 266,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 267,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 268,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 269,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 270,
      "input_richness": "contextualized",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 271,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 272,
      "input_richness": "bare",
      "expected_output": "artifact",
      "impact": "trial",
      "thread_contaminated": true
    },
    {
      "id": 273,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 274,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 275,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": false
    },
    {
      "id": 276,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": false
    },
    {
      "id": 277,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": false
    },
    {
      "id": 278,
      "input_richness": "material",
      "expected_output": "understanding",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 279,
      "input_richness": "contextualized",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 280,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 281,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 282,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 283,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 284,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 285,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": false
    },
    {
      "id": 286,
      "input_richness": "contextualized",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 287,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 288,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 289,
      "input_richness": "material",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    },
    {
      "id": 290,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 291,
      "input_richness": "bare",
      "expected_output": "artifact",
      "impact": "trial",
      "thread_contaminated": true
    },
    {
      "id": 292,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 293,
      "input_richness": "bare",
      "expected_output": "understanding",
      "impact": "exploration",
      "thread_contaminated": true
    },
    {
      "id": 294,
      "input_richness": "bare",
      "expected_output": "fact",
      "impact": "lookup",
      "thread_contaminated": true
    },
    {
      "id": 295,
      "input_richness": "contextualized",
      "expected_output": "artifact",
      "impact": "co_creation",
      "thread_contaminated": true
    }
  ]
};

window.__EXAMPLES__ = {
  "input_richness": {
    "material": [
      {
        "id": 263,
        "topic": "事業所と保険情報のAPI設計（OpenAPI Spec）"
      },
      {
        "id": 277,
        "topic": "SaaS画面のHTML/CSS実装（事業所管理画面）"
      },
      {
        "id": 40,
        "topic": "英文履歴書の職務経歴翻訳・リライト"
      },
      {
        "id": 237,
        "topic": "TypeScript型定義からER図作成（社保等級マスタ）"
      },
      {
        "id": 234,
        "topic": "社会保険料等級表のOCR"
      },
      {
        "id": 43,
        "topic": "JSON/APIデータ構造の設計相談"
      }
    ],
    "contextualized": [
      {
        "id": 33,
        "topic": "YouTube再生速度2倍Chrome拡張機能の開発"
      },
      {
        "id": 64,
        "topic": "マスターDBと履歴DBの設計相談"
      },
      {
        "id": 91,
        "topic": "日本の人事労務システム機能比較調査"
      },
      {
        "id": 49,
        "topic": "SO（ストックオプション）付与契約書テンプレート作成"
      },
      {
        "id": 182,
        "topic": "健保と厚年の等級不一致ケースの網羅的検討"
      },
      {
        "id": 239,
        "topic": "短時間労働者と短時間就労者の英語表記調査"
      }
    ],
    "bare": [
      {
        "id": 10,
        "topic": "Statsigの発音方法"
      },
      {
        "id": 17,
        "topic": "Macでシェルスクリプトを実行する方法"
      },
      {
        "id": 131,
        "topic": "社会保険における「区分」（年金種別・等級・取得区分）"
      },
      {
        "id": 71,
        "topic": "PlantUMLでDB ER図作成"
      },
      {
        "id": 11,
        "topic": "架空のユーザー顔写真の生成依頼"
      },
      {
        "id": 84,
        "topic": "allocationの略記とmallocの意味"
      }
    ]
  },
  "expected_output": {
    "artifact": [
      {
        "id": 263,
        "topic": "事業所と保険情報のAPI設計（OpenAPI Spec）"
      },
      {
        "id": 277,
        "topic": "SaaS画面のHTML/CSS実装（事業所管理画面）"
      },
      {
        "id": 37,
        "topic": "HRIS用ダミー従業員CSVデータ10件の生成"
      },
      {
        "id": 191,
        "topic": "Google Docs画像コピーChrome拡張の開発"
      },
      {
        "id": 134,
        "topic": "PlantUML状態遷移図の横向き化"
      },
      {
        "id": 234,
        "topic": "社会保険料等級表のOCR"
      }
    ],
    "understanding": [
      {
        "id": 131,
        "topic": "社会保険における「区分」（年金種別・等級・取得区分）"
      },
      {
        "id": 43,
        "topic": "JSON/APIデータ構造の設計相談"
      },
      {
        "id": 182,
        "topic": "健保と厚年の等級不一致ケースの網羅的検討"
      },
      {
        "id": 274,
        "topic": "事業所マスタと適用事業所マスタの命名・ER図設計"
      },
      {
        "id": 150,
        "topic": "yarn install時のGITHUB_TOKENエラーとGitHub認証"
      },
      {
        "id": 185,
        "topic": "HTTPメソッドCREATEとAPI設計"
      }
    ],
    "fact": [
      {
        "id": 10,
        "topic": "Statsigの発音方法"
      },
      {
        "id": 123,
        "topic": "被保険者番号・基礎年金番号の桁数"
      },
      {
        "id": 79,
        "topic": "クロス集計表・Pivot Viewの用語確認"
      },
      {
        "id": 84,
        "topic": "allocationの略記とmallocの意味"
      },
      {
        "id": 252,
        "topic": "IT用語「移植」の英訳"
      },
      {
        "id": 46,
        "topic": "給与・賞与の総称（compensation等）"
      }
    ]
  },
  "impact": {
    "co_creation": [
      {
        "id": 263,
        "topic": "事業所と保険情報のAPI設計（OpenAPI Spec）"
      },
      {
        "id": 277,
        "topic": "SaaS画面のHTML/CSS実装（事業所管理画面）"
      },
      {
        "id": 43,
        "topic": "JSON/APIデータ構造の設計相談"
      },
      {
        "id": 33,
        "topic": "YouTube再生速度2倍Chrome拡張機能の開発"
      },
      {
        "id": 237,
        "topic": "TypeScript型定義からER図作成（社保等級マスタ）"
      }
    ],
    "exploration": [
      {
        "id": 131,
        "topic": "社会保険における「区分」（年金種別・等級・取得区分）"
      },
      {
        "id": 182,
        "topic": "健保と厚年の等級不一致ケースの網羅的検討"
      },
      {
        "id": 71,
        "topic": "PlantUMLでDB ER図作成"
      },
      {
        "id": 64,
        "topic": "マスターDBと履歴DBの設計相談"
      },
      {
        "id": 170,
        "topic": "古典文法「歩かれむ」と万葉仮名・漢文表記"
      }
    ],
    "lookup": [
      {
        "id": 10,
        "topic": "Statsigの発音方法"
      },
      {
        "id": 84,
        "topic": "allocationの略記とmallocの意味"
      },
      {
        "id": 123,
        "topic": "被保険者番号・基礎年金番号の桁数"
      },
      {
        "id": 46,
        "topic": "給与・賞与の総称（compensation等）"
      },
      {
        "id": 252,
        "topic": "IT用語「移植」の英訳"
      }
    ],
    "trial": [
      {
        "id": 11,
        "topic": "架空のユーザー顔写真の生成依頼"
      },
      {
        "id": 122,
        "topic": "マイナンバーサンプル番号の生成と検証"
      },
      {
        "id": 178,
        "topic": "FFmpeg WAV to MP3変換コマンド"
      },
      {
        "id": 272,
        "topic": "UUID生成"
      }
    ]
  }
};

window.__HYGIENE__ = {
  "sessions": [
    {
      "title": "HTMLラジオボタンの修正と解説",
      "topic_count": 27,
      "query_count": 57
    },
    {
      "title": "UIテキスト改善：保険料入力指示",
      "topic_count": 23,
      "query_count": 46
    },
    {
      "title": "Googleスプレッドシートで行番号を特定する",
      "topic_count": 20,
      "query_count": 59
    },
    {
      "title": "クリップボードの実装と仕組み",
      "topic_count": 18,
      "query_count": 41
    },
    {
      "title": "Mac ウィンドウクリック操作の改善",
      "topic_count": 11,
      "query_count": 19
    },
    {
      "title": "債務超過時の分社化：リスクと実務",
      "topic_count": 11,
      "query_count": 28
    },
    {
      "title": "OpenAPIドキュメントビューワ作成",
      "topic_count": 10,
      "query_count": 17
    },
    {
      "title": "jinjer 事業所マスタの概要",
      "topic_count": 7,
      "query_count": 14
    },
    {
      "title": "日本の銀行口座特定に必要な情報",
      "topic_count": 6,
      "query_count": 17
    },
    {
      "title": "HR Tech SaaS_ Paper Pusher to People Partner",
      "topic_count": 6,
      "query_count": 10
    },
    {
      "title": "API 設計：事業所と保険情報",
      "topic_count": 6,
      "query_count": 16
    },
    {
      "title": "Extraordinary All-hands のニュアンス",
      "topic_count": 5,
      "query_count": 8
    },
    {
      "title": "Bi-temporal データ構造のブログ記事作成",
      "topic_count": 5,
      "query_count": 14
    },
    {
      "title": "Mac ターミナル プロンプト表示問題",
      "topic_count": 4,
      "query_count": 7
    },
    {
      "title": "Googleドキュメントのプルダウン選択肢上限",
      "topic_count": 4,
      "query_count": 15
    },
    {
      "title": "ブラウザ拡張のパスキー保存構成",
      "topic_count": 4,
      "query_count": 5
    },
    {
      "title": "TypeScript型定義からER図作成",
      "topic_count": 4,
      "query_count": 18
    },
    {
      "title": "社会保険の短時間就労者とは",
      "topic_count": 3,
      "query_count": 4
    },
    {
      "title": "社会保険における「区分」とは？",
      "topic_count": 3,
      "query_count": 7
    },
    {
      "title": "Googleドキュメントでの目次作成",
      "topic_count": 2,
      "query_count": 3
    },
    {
      "title": "シンプルなテキストエディタの選び方",
      "topic_count": 2,
      "query_count": 3
    },
    {
      "title": "データの直積をフラット化するとは",
      "topic_count": 2,
      "query_count": 2
    },
    {
      "title": "Google Docs 画像ダウンロード方法",
      "topic_count": 2,
      "query_count": 2
    },
    {
      "title": "HTML to Separate Files",
      "topic_count": 2,
      "query_count": 5
    },
    {
      "title": "`transaction_to`と`deleted_at`の違い",
      "topic_count": 2,
      "query_count": 4
    },
    {
      "title": "ソフトウェア開発における期間変更の名称",
      "topic_count": 2,
      "query_count": 2
    },
    {
      "title": "Google Sheets 範囲出力関数一覧",
      "topic_count": 2,
      "query_count": 7
    },
    {
      "title": "マイナンバーサンプル番号の生成",
      "topic_count": 2,
      "query_count": 5
    },
    {
      "title": "アイデミーの事業内容を解説",
      "topic_count": 2,
      "query_count": 3
    },
    {
      "title": "Google Docs 画像コピーChrome拡張",
      "topic_count": 2,
      "query_count": 16
    },
    {
      "title": "3Dセキュアの現状と将来性",
      "topic_count": 2,
      "query_count": 5
    },
    {
      "title": "「読んでください」の敬語表現",
      "topic_count": 2,
      "query_count": 6
    },
    {
      "title": "複数健保組合加入の可能性と現実",
      "topic_count": 2,
      "query_count": 6
    },
    {
      "title": "こんにちは、何かお手伝いしましょうか",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "CSVにおけるテキストデータの扱い",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "セミコロンの使い方とページタイトル",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "Finderサイドバーにゴミ箱を固定",
      "topic_count": 1,
      "query_count": 2
    },
    {
      "title": "CSSでitemContentsの幅を変更",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "単機能モダンCSVエディタの紹介",
      "topic_count": 1,
      "query_count": 2
    },
    {
      "title": "Slackボット投稿通知設定方法",
      "topic_count": 1,
      "query_count": 2
    },
    {
      "title": "法人と個人の資産比較",
      "topic_count": 1,
      "query_count": 2
    },
    {
      "title": "Macのマウススクロール速度調整",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "Statsigの発音方法",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "taustg user2 という名前の人物の顔写真",
      "topic_count": 1,
      "query_count": 3
    },
    {
      "title": "CSVにおけるNull値のスマートな定義",
      "topic_count": 1,
      "query_count": 2
    },
    {
      "title": "Figma Ctrl+ホイールズーム方向変更",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "シェルスクリプトによる高品質GIF変換",
      "topic_count": 1,
      "query_count": 2
    },
    {
      "title": "HRIS UIデザインアプローチ比較と結論",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "Krokiサーバーのデータ永続性について",
      "topic_count": 1,
      "query_count": 2
    },
    {
      "title": "Macのデフォルトパスと追加方法",
      "topic_count": 1,
      "query_count": 4
    },
    {
      "title": "YouTube 再生速度 2倍 Chrome 拡張",
      "topic_count": 1,
      "query_count": 3
    },
    {
      "title": "ダイアグラム作成ツールとDiagram as Code",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "ダミー従業員データ生成",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "日本の銀行口座特定情報と取引の必要性",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "「むしろ」の言い換え表現",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "Resume Work Experience Translation",
      "topic_count": 1,
      "query_count": 10
    },
    {
      "title": "Money Forward_ Fintech and SaaS Solutions",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "Chrome拡張機能開発の第一歩",
      "topic_count": 1,
      "query_count": 2
    },
    {
      "title": "Firefox PWA アプリドロワー非対応",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "日本の人事労務システム機能比較",
      "topic_count": 1,
      "query_count": 2
    },
    {
      "title": "目標達成点課題点の情報提供依頼",
      "topic_count": 1,
      "query_count": 2
    },
    {
      "title": "Qiita ログインポップアップ非表示 CSS",
      "topic_count": 1,
      "query_count": 3
    },
    {
      "title": "人事管理における口座・支給情報登録機能設計",
      "topic_count": 1,
      "query_count": 3
    },
    {
      "title": "CSSで矢印を上付き文字風に",
      "topic_count": 1,
      "query_count": 3
    },
    {
      "title": "数値選択UIの名称について",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "肖像写真が見つかりません",
      "topic_count": 1,
      "query_count": 3
    },
    {
      "title": "肖像写真作成の可否と詳細",
      "topic_count": 1,
      "query_count": 4
    },
    {
      "title": "C++で書かれた普及プログラム",
      "topic_count": 1,
      "query_count": 3
    },
    {
      "title": "Jira Google連携「アプリブロック」の解決",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "Notion 階層構造可視化 Stylus CSS",
      "topic_count": 1,
      "query_count": 3
    },
    {
      "title": "SlackからNotionへのタスク作成",
      "topic_count": 1,
      "query_count": 2
    },
    {
      "title": "API連携におけるリダイレクトURIとは",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "Rewriting Redundant Maintenance Effort",
      "topic_count": 1,
      "query_count": 3
    },
    {
      "title": "Mermaid ユースケース図作成",
      "topic_count": 1,
      "query_count": 5
    },
    {
      "title": "社会保険料がマイナスになるケース",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "PlantUML 状態遷移図の横向き化",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": ".NETの名前の由来と背景",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "Map と Reduce の並列計算",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "TauToDo Slack Reacji デザイン提案",
      "topic_count": 1,
      "query_count": 3
    },
    {
      "title": "社会保険料計算の例外",
      "topic_count": 1,
      "query_count": 2
    },
    {
      "title": "TypeScript Enum 定義の提案",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "架空の苗字「たうすて」の漢字候補",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "資格取得届と算定基礎届の対応",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "社会保険料の上限額について",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "プロンプト作成支援：AI向け指示の具体化",
      "topic_count": 1,
      "query_count": 13
    },
    {
      "title": "会計ソフトOSSとマネージドサービス",
      "topic_count": 1,
      "query_count": 2
    },
    {
      "title": "全角括弧のマッチング正規表現",
      "topic_count": 1,
      "query_count": 3
    },
    {
      "title": "都道府県コード順のリスト分析",
      "topic_count": 1,
      "query_count": 4
    },
    {
      "title": "Mermaid 矢印に補足テキストを追加",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "FFmpeg WAV to MP3 Conversion",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "マスターの対義語：トランザクションとコンシューマ",
      "topic_count": 1,
      "query_count": 4
    },
    {
      "title": "この白黒写真をカラーに直して。白くて明るい部屋で取られた写真で、発言者の服の色は黒です",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "CursorでGitブランチ名を表示する方法",
      "topic_count": 1,
      "query_count": 5
    },
    {
      "title": "SaaSの終焉とAIの台頭",
      "topic_count": 1,
      "query_count": 17
    },
    {
      "title": "プレモーテムMECEフレームワーク集",
      "topic_count": 1,
      "query_count": 8
    },
    {
      "title": "従業員_従業員番号_L002_氏名_倒捨 ろぐに_氏名（フリガナ）_タウステ ログニ_所属_主務かどうか_主務_組織_社長_事業部_営業部_役職_役職1_ID_マネーフォワード ID_taustg-login2_ログイ.md",
      "topic_count": 1,
      "query_count": 2
    },
    {
      "title": "NotionでのHTMLホスティングの可否",
      "topic_count": 1,
      "query_count": 5
    },
    {
      "title": "厚年非加入・健保加入の可能性",
      "topic_count": 1,
      "query_count": 2
    },
    {
      "title": "HTML を生成して。条件は以下___ 大きく分けて、上部と下部に分かれる。大きさは均等ではない (上部のほうが小さい)__ 上部はフィルター条件を指定する部分。___ 上部左端にはド.md",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "GitHub プライベートリポジトリ共有方法",
      "topic_count": 1,
      "query_count": 12
    },
    {
      "title": "健保と厚年で等級がずれる理由",
      "topic_count": 1,
      "query_count": 2
    },
    {
      "title": "差し戻し申請の適用開始日バグ修正",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "FFmpegで動画をMP4に変換",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "# Tau's Playground - PdM Sandbox and Idea Scraps__## 💡 概要_このリポジトリは、PdM 業務における__技術的な検証、UI モックアップ、一時的なスクリプト、アイデアの断片__を雑多に保管する.md",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "国保組合の保険料と等級",
      "topic_count": 1,
      "query_count": 2
    },
    {
      "title": "健康保険と国民健康保険の違い",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "Miroの表の行を一括削除する方法",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "Miroフレーム機能の役割と使い方",
      "topic_count": 1,
      "query_count": 2
    },
    {
      "title": "Notionで削除した記事を復元する方法",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "Zoom録画再生時のコントロールバー常時表示",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "JSON配列とオブジェクトの順序保証",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "半期目標設定のリライト提案",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "HTMLテーブル改造・データ追記スクリプト",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "Notionで写真アルバムを作成する方法",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "PulumiとOpenTofuの違い",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "OCR結果：社会保険料等級表",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "JSON 型定義のベストプラクティス",
      "topic_count": 1,
      "query_count": 3
    },
    {
      "title": "システム仕様の整理と改善提案",
      "topic_count": 1,
      "query_count": 2
    },
    {
      "title": "ぱきっとした明るい写真になるように色味を修正して",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "Notion 見出しインデント Stylus CSS",
      "topic_count": 1,
      "query_count": 2
    },
    {
      "title": "協会けんぽにおける事業所の役割",
      "topic_count": 1,
      "query_count": 1
    },
    {
      "title": "協会けんぽにおける事業所の名称",
      "topic_count": 1,
      "query_count": 3
    },
    {
      "title": "SaaS画面のHTML_CSS実装",
      "topic_count": 1,
      "query_count": 1
    }
  ]
};
