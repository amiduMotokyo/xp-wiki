# 技能速查页面

> By 秋田

相信大家都遇到过一个问题：

为寻找一个技能的效果，或者为了分辨一个技能的部分内容而感到非常苦恼，而且有时会当场提出一些文本方面的质疑。

这当然和我们的文本未能进行标准化有关，但是对于xp规则这种流动性大、容易造成反复的规则书来说，一次规范完所有内容是不现实的。

另一方面，大伙已经忙到连有bug都要排时间去修的程度了，因此每个人每次更新都进行规范化也是不现实的。让一个index管理员专门进行规范化也是不现实的。

一开始我只是想要将自己平时使用时遇到的问题记下来，方便再次查看和复习，但后来我认为这样的东西可以放在库里让大家一起看。

因此，我做了这个页面。这个页面将会写出所有我们现存的技能，但不包括异常状态，分类是random的，肯定不会很规整，因为是看到哪里写到哪里。我会用尽量少的字符表示出一个技能的使用方法、状态和效果，比如：

* 奇招百出

* +8（不叠加）

就像这样。如果要增加内容，则会在这个基础上加上这个技能的获取方式。根据情况，也会把一些职业的特性放到此类之中。因为你知道，有些技能的特性确实来不及确认，而切换职业就等于切换特性。

当然，在整理途中，肯定会丢失信息，这时就容易产生新的理解错误，那么如果有人捉虫就最好了，感谢。

好的，那么首先我会从通用技能入手。

>后来我想了下，这不就是把表格拆成了几行吗？果然还是不一样的，因为预想之中，这里会汇总**所有**技能。希望这个文档不会太大，感恩markdown之神。

## 略称解释

为保证言语的简短性，文中将会使用大量略称。这样的略称并非胡略、乱略，而是尽量在保证略称简短、可读、易理解的前提下进行缩略。意在用一两个字省略一两句话的文本。

然而，当然每个人的脑回路都不一样，我仍然会在此处标明后续将会用到的部分术语。你可以善用页面搜索（ctrl+F）来进行检索。

### 范围

在描述一个效果的生效范围或索敌范围时，我们会使用一系列的描述方式。然而因为没有经过标准化，不同人会采用不同的表达方式，造成误解。此处将本表会使用的范围术语加以解释和演示。

1. 周围四格

也称“范围为1”

假设一个单位的占地面积为1×1，那么【周围四格】一词指包括该单位所在地格在内，上、下、左、右各1格的范围，在二维平面上共5格。

* 额外：如果加入三维计算，那么假设每个人形单位的身高平均在1.0~2.5之内，按照逻辑，该单位占据的空间共为1×1×2，【周围四格】的攻击幅度应当可以够到头顶的第一格，即，高度3之敌人。

2. 剑雨范围

也称“范围为2”

在周围四格的基础上，增加了一圈共计8格的区域。因明日方舟的先锋德克萨斯二技能【剑雨】而得名。

三维计算太麻烦了所以passpass

3. 周围8格

也称“范围1.5”

在周围四格的基础上，增加四格角格，包括自身地格应当共计9格的区域。

4. 待补充……

### 检定数值增减

为简洁起见，对于检定阈值的操作，这里直接写出操作者发动效果后应当在自己的骰子指令中写入的字符。

1. 加减法符号：增减检定阈值

如：+8，意为检定阈值+8，是一个增益效果。减法反之。

2. 大小于号：增减检定出目

如：<5，意为检定出目-5，是一个增益效果，大于号反之。

3. 等于号：强制设定为……

采用了代码中常用的逻辑，右边的值赋值给左边，或者说使左边必然等于右边。总之，是强制决定一个可变动数值变为一个具体、固定的数值。

### 口头语

1. （数字）行动=行动点

### 特殊标点符号使用

1. 用【】扩起的内容：一般为异常状态，请到异常状态大全页面查找，善用页面搜索，如有bug请找我。

## A

### 暗杀

* 类型：被动

* 获取方式：近程武器上级通用

* 发动条件：1. 措手不及；2. 攻击；3. 成功；

* 增益：额外固伤（1/0.4/0.2倍于对方HP，取决于对方为小兵/精英/Boss）

* 额外限制：每场战斗，每个目标，限一次

### 暗袭

* 类型：被动

* 获取方式：远程武器上级通用

* 发动条件：1.一行动轮一次；2.对方措手不及；3.不能搞连射；4.对方识破隐形1奖励

* 增益：对方对抗阈值=10

## B

### 剥壳

（bao'ke）

* 类型：被动

* 获取方式：远程武器初级通用

* 发动条件：瞄准

* 增益：可选，瞄准部位护甲减伤率=100%

* 额外：盾伤害倍率=0.5

### 不绝连击

* 类型：被动

* 获取方式：短程武器初级通用

* 发动条件：1. 使用短程武器；2. 进攻

* 增益：（该武器的）攻击衰减速度减半

## C

### 残废击

* 类型：特战-武器一致

* 获取方式：短程武器中级通用

* 发动条件：8sp

* 增益：1.本次致残；2. 固定锁脚；

* 额外条件：造伤

* 额外增益：抵抗判【瘸脚】

### 寸短寸险

* 类型：被动

* 获取方式：短程武器初级通用

* 发动条件：打目标正面

* 增益：1.+4；2.<4

* 额外：战术15级；不计算触发战术

* 额外增益：1奖励

### 趁虚而入

* 类型：触发

* 获取方式：短程武器中级通用

* 发动条件：1. 使用短程武器；2. 进攻行动；3. 目标陷入异常状态；4. 3sp

* 增益：1奖励

## D

### 打带跑

* 类型：被动

* 获取方式：短程武器中级技能

* 发动条件：1. 攻击行动；2. 成功

* 增益：1移动行动点

* 额外限制：1. 该技能获得的移动行动点上限为3；2. 一行动轮后（该角色回复阶段）行动点失效

### 点穴

* 类型：特战-武器一致

* 获取方式：短程武器上级技能

* 发动条件：10sp

* 增益：1. +0.5倍；2. 半额抵抗致伤（除头部）

* 额外：本次致伤有效期一行动轮

### 断筋击

* 类型：特战-武器一致

* 获取方式：短程武器初级通用

* 发动条件：1. 8sp；2. 固定打腿；3. 造伤

* 增益：对方抵抗【断筋】

## E

### 二刀流

* 类型：被动

* 获取方式：中程武器初级通用

* 发动条件：1. 双持；2. 进攻

* 增益：副武器进攻阈值照旧

* 额外条件：副手为远程武器

* 额外增益：不吃近战接触惩罚

* 额外限制：与【协调】互斥

## F

## G

### 贯穿射击

* 类型：特战-武器一致

* 获取方式：远程武器上级通用

* 发动条件：10sp

* 增益：1.贯穿；2.倍率+1

* 额外：每穿一个人，倍率-0.25

### 关节打击

* 类型：特战-武器一致

* 获取方式：近程武器上级通用

* 发动条件：8sp

* 增益：1. -10sp；2. -2ap

* 额外条件：成功

* 额外增益：8固伤

## H

### 寒芒

* 类型：特战-武器一致

* 获取方式：远程武器初级通用

* 发动条件：1.5sp；2.检定成功；3.造伤

* 增益：击中部位抵抗【伤口】

## I

## J

### 机动

* 类型：被动

* 获取方式：远程武器初级通用

* 发动条件：受近战攻击

* 增益：1.立刻，+2移动行动点；2.无视借机/无视威压

### 近程射击

* 类型：被动

* 获取方式：远程武器初级通用

* 发动条件：攻击范围/2

* 增益：<8;瞄准=2行动

### 精准格挡

* 类型：被动特战

* 获取方式：中程武器初级通用

* 发动条件：1.对抗失败；2.对抗终差值<熟练度

* 增益：完全抵消本次伤害

* 限制：每行动轮一次

* 独特升级：每被动防守一次，本技能+2经验

* 升级限制：熟练度<=30

### 精准射击

* 类型：特战-武器一致

* 获取方式：远程武器初级通用

* 发动条件：5sp

* 增益：1.仅1行动点；2.瞄准；3.无视近战接触惩罚

### 惊喜礼物

* 类型：被动

* 获取方式：远程武器上级通用

* 发动条件：1.回合开始时；2.第一次攻击

* 增益：1.不消耗弹药；2.异常状态二选一：【中毒】/【麻痹】

### 狙击武器

* 类型：特战-武器一致

* 获取方式：远程武器中级通用

* 发动条件：1.8sp；2.成功；3.造伤

* 增益：打落武器

* 额外：任何人-2行动捡起掉落的武器

## K

### 开门见山

* 类型：被动

* 获取方式：远程武器中级通用

* 发动条件：1.每行动轮初次；2.射击

* 增益：1.-0行动点；2.不衰减

## L

### 连打

* 类型：特战-武器一致

* 获取方式：近程武器中级通用

* 发动条件：10sp

* 增益：1. 本次攻击等同于2d2次攻击；2. 可叠加异常状态/印记

* 个人理解：战技的漩涡连发

### 灵活走位

* 类型：触发

* 获取方式：近程武器上级通用

* 发动条件：1. 脱离交战状态时；2. 3sp

* 增益：不出破绽

* 发动条件2: 1. 进入威压范围前；2. 3sp

* 增益2：无视威压

## M

## N

### 凝神

* 类型：被动

* 获取方式：远程武器中级通用

* 发动条件：额外消耗n行动，n最大6

* 增益：1.+5n；2.额外伤害+n

## O

## P

### 平步青云

* 类型：触发

* 获取方式：近程武器上级通用

* 发动条件：1. 3sp；2. 自身回合开始时宣告触发

* 增益：无视一切增减移动行动点效果（不可穿墙）

## Q

### 旗手

* 类型：职业特性（一星·主职）

* 所属社群：无（基础职业）

* 1级：1.【激励】群发到感知范围所有队友（除自己）；2.开局宣属性光环+魅力/10（45法）；3.2行动点换属性；4.同种不叠加，取最高；5.所加项目不超过原面板1/2

* 5级：6.反向光环，所减项目不超过原面板1/2

* 9级：7.同时开两种（不论正负）

#### 旗手大师

* 类型：被动

* 获取方式：旗手10级

* 增益：1.【激励】群发到感知范围所有队友（除自己）；2.开局宣属性光环+魅力/10（45法）；3.2行动点换属性；4.同种不叠加，取最高；5.所加项目不超过原面板1/2

* 额外：不能叠本家

### 全神贯注

* 类型：特战-武器一致

* 获取方式：远程武器上级通用

* 发动条件：1.10sp；2.成功

* 增益：固伤（算减伤不算甲）

* 额外：盾伤害倍率=0.5

## R

## S

### 哨兵

烧饼（并非）

* 类型：职业特性（一星·主职）

* 所属社群：无（基础职业）

* 1级：1.感知范围+0.5倍；2.每行动轮+1移动行动点

* 9级：1.感知范围+1倍；2.每行动轮+2移动行动点

#### 哨兵大师

* 类型：被动

* 获取方式：哨兵10级

* 增益：1.感知范围+0.5倍；2.每行动轮+1移动行动点

* 额外：不能叠本家

### 神射手

* 类型：被动

* 获取方式：远程武器中级通用

* 发动条件：1.盲斗；2,.命中头部/弱点

* 增益：1.倍率+0.5；2.1破绽

### 双手共持

* 类型：被动

* 获取方式：中程武器初级通用

* 发动条件：1. 无法进行双持进攻（将单手武器视为双手武器）；2. 1行动启动/关闭；3. 所有进攻消耗行动+1

* 增益：总伤倍率+0.5

### 顺水推舟

* 类型：被动

* 获取方式：短程武器初级通用

* 发动条件：1. 受近战攻击；2. 对抗成功

* 增益：3固伤

* 额外：体型与自身相同（占地面积）

* 额外增益：改变对方朝向/交换双方位置

## T

### 偷袭

* 类型：被动

* 获取方式：短程武器中级通用

* 发动条件：1. 对方措手不及；2. 进攻行动

* 增益：对方防守阈值减半

## U

## V

## W

### 完美谢幕

* 类型：被动

* 获取方式：远程武器上级通用

* 发动条件：1.本行动轮已有3次及以上攻击；2.本次攻击后，行动点无法支持再次攻击；3.每行动轮一次

* 增益：1.不衰减；2.<8；3.倍率+0.5

### 卫士

* 类型：职业特性（一星·主职）

* 所属社群：无（基础职业）

* 1级：1.周围4格队友单位全身护甲+1；2.【坚守】+1；3.替人防守+1奖励骰

* 7级：1.周围剑雨范围队友单位全身护甲+2；2.【坚守】+1；3.替人防守+1奖励骰

* 额外：如果【坚守】加无可加，那么可加【蹲伏】/【反击】

#### 卫士大师

* 类型：被动

* 获取方式：卫士10级

* 增益：1.周围4格队友单位全身护甲+1；2.【坚守】+1；3.替人防守+1奖励骰

* 额外：不能叠本家

### 武者

* 类型：职业特性（一星·主职）

* 所属社群：无（基础职业）

* 1级：1.每行动轮+1子弹时间；2.每行动轮+1敌意行动点

* 5级：1.每行动轮+2子弹时间；2.每行动轮+1敌意行动点

* 7级：1.每行动轮+2子弹时间；2.每行动轮+2敌意行动点

#### 武者大师

* 类型：被动

* 获取方式：武者10级

* 增益：1.每行动轮+1子弹时间；2.每行动轮+1敌意行动点

* 额外：不能叠本家

### 卧薪尝胆

* 类型：被动

* 获取方式：近程武器中级通用

* 发动条件：受到攻击

* 增益：将所受HP伤害等量累积并作为一个储存值，下一次攻击行动的总伤倍率+(这个值除以50)倍。

* 额外限制：本技能提供的倍率增加最高为+1倍。

## X

### 效力强化

* 类型：被动

* 获取方式：远程武器中级通用

* 发动条件：异常弹药附加成功

* 增益：1.抵抗1惩罚；2.抵抗>4

### 娴熟打击

* 类型：被动

* 获取方式：短程武器上级通用

* 发动条件：1. 使用短程武器；2. 进攻

* 增益：武器威力附加（力+敏）/20

### 协调

* 类型：被动

* 获取方式：短程武器初级通用

* 发动条件：1. 短程武器为副手；2. 双持；3. 进攻

* 增益：主副武器威力照旧

* 额外：与二刀流互斥

### 卸其羽翼

* 类型：特战-武器一致

* 获取方式：远程武器中级通用

* 发动条件：1.8sp；2.成功；3.造伤

* 增益：强制破绽1次

* 额外：如果打空中单位

* 额外增益：1.倍率+0.5；2.击落

### 迅击

* 类型：特战-武器一致

* 获取方式：短程武器初级通用

* 发动条件：无

* 增益：本次进攻不衰减

## Y

### 援护射击

* 类型：被动

* 获取方式：远程武器初级通用

* 发动条件：无

* 增益：远程夹击（提供+享受）

## Z

### 最佳角度

* 类型：被动

* 获取方式：远程武器上级通用

* 发动条件：无

* 增益：1.射程+0.5倍；2.无视障碍

* 额外：不能连续2个障碍
