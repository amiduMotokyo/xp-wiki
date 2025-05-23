# 鲜血系魔法书

## 鲜血系魔法共通效果

### 血袋

* 获取：消耗自己5hp采血，可获得1×血袋。若是战斗中，则需要花费2行动点，且视为一个破绽。
* 效果：用来代替鲜血系魔法中的hp消耗。
* 限制：没法榨出血的种族（例如骷髅和幽灵）无法执行此操作。
* 优势：血族可以饮用血袋（视为使用道具），获得5点点数用于回复HP或SP。
* 售价：50通。但大部分非魔族的商店是拒绝交易这种东西的。
* 携带上限：习得鲜血系魔法的玩家数量×15。

### 消耗血液

* 效果：使用魔法需要额外消耗血液（HP）作为代价。每次使用初/中/上级的魔法时（每次过载将算作完整一次施法），将要保底消耗5/10/15的HP作为额外施法消耗，可计算至魔法的额外消耗量中。
* 代替：可以使用1/2/3份血袋来代替保底HP消耗，代替部分不可计算为额外消耗量。 每进行t重过载，血袋消耗量就要翻t倍。
* 限制：没法榨出血的种族（例如骷髅和幽灵）只能通过消耗血袋来释放鲜血系魔法。
* 优势：血族可减半施法保底HP消耗（向上取整），且获得的增益保持不变。
* 注意：鲜血系魔法无法使用“允许缝合另一<a href="/rules/V4.x rules/8·magic/#心神之法" target="_blank">心神之法</a>流派魔法的效果”过载效果。

!!! info "用数学公式解释鲜血系魔法消耗HP规则"
    几乎所有鲜血魔法都有“额外施法消耗”来增强魔法的能力，记为z。

    每次使用魔法的保底HP消耗记为x。魔法为初级时，x=5；魔法为中级时，x=10；魔法为上级时，x=15。每进行t重过载，x就要翻t倍。

    你还可以额外再投入HP来继续增强魔法能力，额外投入的HP量记为y

    于是，当不使用血袋使用鲜血系魔法时，z=x+y。

    使用血袋的情况下，免除的是保底HP消耗x，于是z=y。

### 特殊技艺：鲜血系精通

* 初始：可以通过一个鉴定知道血液主人是什么种族。
* 10级进阶：所有鲜血类法术检定值获得-3奖励，可额外消耗5HP再-3，计入额外消耗量。
* 20级进阶：所有鲜血类类法术检定可额外消耗5HP获得1枚奖励骰，计入额外消耗量。凝血护盾/猩红壁垒生成的护盾屏障延长一回合存在时间（即第三回合开始消耗行动点）。
* 30级进阶：所有鲜血类法术检定值获得-3奖励，可额外消耗5HP再-3，计入额外消耗量。


## 初级魔法

### 凝血飞弹

#### 魔法流派与消耗

* <a href="/rules/V4.x rules/8·magic/#心神之法" target="_blank">心神之法</a>
* 击发类型：<a href="/rules/V4.x rules/8·magic/#魔法的击发类型" target="_blank">弹道型</a>

#### 效果

* 初始：造成威力为3的魔法伤害
* 10级进阶：发射量增加一发血弹(即变为3x2)
* 20级进阶：可额外消耗HP增加本回合所有血弹HP/2的魔法伤害(最多5点伤害)
* 30级进阶：如果消耗的额外消耗达到HP10，则敌人对抗本魔法的闪避检定阈值减半
* 30级名称改变：猩红命运

### 凝血护盾

* 该法术为持续效果，施法者受到失去意识词条的异常状态影响将会自动解除

#### 魔法流派与消耗

* <a href="/rules/V4.x rules/8·magic/#心神之法" target="_blank">心神之法</a>
* 击发类型：<a href="/rules/V4.x rules/8·magic/#魔法的击发类型" target="_blank">定点型</a>

#### 效果

* 初始：获得（检定差值/5四舍五入）护盾屏障，可额外消耗HP生成（HP×1.5）护盾屏障，持续一回合，可每回合付出2行动点延长。
* 10级进阶：拥有护盾时对自身施法范围/2（最低为3）的单位造成伤害时，获得该伤害值1/4（向上取整）的护盾屏障。若为血族则可选择改为恢复生命值。同时额外消耗可使用血袋，每份提供6点护盾屏障。
* 20级进阶：升级为可额外消耗HP生成（HP×2）护盾屏障，护盾屏障上限从生命值一半提升至生命上限。
* 30级进阶：护盾屏障未被击破时免疫一切非地形的外生型异常。
* 30级名称改变：猩红壁垒。

!!! example "护盾屏障的触发"
    在伤害计算完毕之后若该次伤害总量小于护盾屏障量，则减少该次伤害等额的护盾屏障量并将该次伤害变为0（仍然可以触发攻击方造成伤害的附加效果），若反之则直接直接移除全部护盾屏障且不减少伤害。

    同时，近战武器造成伤害时移除的护盾屏障量需要翻倍，但翻倍的部分不影响触发计算。

    例：A为屏障量，B为伤害量；非近战伤害：A>B时，A-B实际伤害变为0；A<B时，A变为0，实际伤害不变。若为近战伤害：A>B时，A-2*B实际伤害变为0；A<B时，A变为0，实际伤害不变。

### 血液再生

#### 魔法流派与消耗

* <a href="/rules/V4.x rules/8·magic/#心神之法" target="_blank">心神之法</a>
* 击发类型：<a href="/rules/V4.x rules/8·magic/#魔法的击发类型" target="_blank">定点型</a>

#### 效果

* 初始：将本魔法的额外与保底施法消耗从HP改为SP。恢复目标（检定差值/10四舍五入）+SP/2的HP
* 10级进阶：升级为恢复（检定差值/10四舍五入）+SP的HP
* 20级进阶：同时清除<a href="../../status/mark/#中毒印记" target="_blank">“中毒印记”</a>、<a href="../../status/mark/#流血印记" target="_blank">“流血印记”</a>的所有层数与<a href="../../status/normal/#麻痹" target="_blank">“麻痹”</a>状态
* 30级进阶：升级为恢复（检定差值/5四舍五入）+SP的HP
* 30级名称改变：猩红再生

### 血液吸取

* 该法术仅限血族使用

#### 魔法流派与消耗

* <a href="/rules/V4.x rules/8·magic/#心神之法" target="_blank">心神之法</a>
* 击发类型：<a href="/rules/V4.x rules/8·magic/#魔法的击发类型" target="_blank">定点型</a>

#### 效果

* 初始：本魔法的额外与保底施法消耗可以从HP改为SP。抽取周围一格范围内的一名目标，吸取目标（额外消耗/2）+（对抗差值/5）的生命值。该目标必须是可受到“活体”词条影响，可对满足条件的新鲜尸体使用，但只有一半效果。
* 10级进阶：吸取量改为额外消耗/2+（对抗差值/3）的生命值。
* 20级进阶：吸取量改为额外消耗+（对抗差值/3）的生命值。
* 30级进阶：敌方魔法抗性获得一枚惩罚骰。
* 30级名称改变：猩红汲取

## 中级魔法

### 血液传递

#### 魔法流派与消耗

* <a href="/rules/V4.x rules/8·magic/#心神之法" target="_blank">心神之法</a>
* 击发类型：<a href="/rules/V4.x rules/8·magic/#魔法的击发类型" target="_blank">定点型</a>

#### 效果

* 初始：对周身九宫格范围内的一名原本可受到活体词条异常影响的目标使用，目标回复（检定差值/10四舍五入）+与额外施法消耗等值的HP。本魔法无法通过过载增加目标数量。
* 10级进阶：目标额外回复HP总回复量/3（向上取整）的SP
* 20级进阶：施法范围从原来的九宫格扩展为正常的施法范围。
* 30级进阶：对于HP修正对于HP被修正到0的目标，解除其<a href="../../status/normal/#濒死" target="_blank">“濒死”</a>与<a href="../../status/normal/#致命伤" target="_blank">“致命伤”</a>状态
* 30级名称改变：猩红复苏

注：不用担心血型问题，魔法粒子会处理好一切的。

### 嗜血狂乱

* 该法术为持续效果，施法者受到失去意识词条的异常状态影响将会自动解除

#### 魔法流派与消耗

* <a href="/rules/V4.x rules/8·magic/#心神之法" target="_blank">心神之法</a>
* 击发类型：<a href="/rules/V4.x rules/8·magic/#魔法的击发类型" target="_blank">定点型</a>

#### 效果

* 初始：目标获得（检定差值/10四舍五入）+（额外消耗HP/10四舍五入）次1回合内进攻不衰减的机会，代价是每次进行这种进攻需要额外扣除（原本衰减/3）点HP
* 10级进阶：目标周围一圈的单位也会受到影响。
* 20级进阶：升级为（检定差值/10四舍五入）+（额外消耗HP/5四舍五入），进攻只需要额外扣除（原本衰减/4）点HP
* 30级进阶：进攻时可再额外对自身造成5伤害，减少进攻一半的行动点消耗（不计算技能的额外投入），每回合最多两次。
* 30级名称改变：猩红暴走

注：双持武器计算本魔法的HP代价消耗时，取进攻衰减高的武器，每次进攻只算1次。

### 血液武器

* 该法术为持续效果，施法者受到失去意识词条的异常状态影响将会自动解除

#### 魔法流派与消耗

* <a href="/rules/V4.x rules/8·magic/#心神之法" target="_blank">心神之法</a>
* 击发类型：<a href="/rules/V4.x rules/8·magic/#魔法的击发类型" target="_blank">定点型</a>

#### 效果

* 初始：制造一把存在1回合（可每回合付出3行动点延长），等级为1的近战武器（可使用投掷与搬运，回合结束时若不在手中则直接摧毁），使用该武器造成的伤害为魔法伤害，对抗时使用对应武器挂钩魔力属性的鉴定阈值，应用该类武器技能与通用技能。武器威力额外附加（检定差值/20四舍五入）+（额外消耗hp/5）点（最多额外附加10点威力）；或对已有近战武器使用增加其威力，使该武器威力附加上述效果一半的数值，且不改变伤害类型，持续一回合。使用拥有本魔法效果的武器（包括本魔法制造的武器）进攻时获得一半的经验值。
* 10级进阶：新增武器类别：弓，每次射击时消耗消耗3点HP以代替弹药。（包括制造与强化已有武器）
* 20级进阶：可对制造出的武器消耗1点AP再次释放，不再消耗生命值，释放成功则改变武器类别；在使用本魔法制造的武器对抗成功时，下一次改变类型不再消耗AP且获得1奖励骰。
* 30级进阶：魔法效果将持续至战斗结束，不再需要AP延长持续时间。
* 30级名称改变：猩红武装

### 鲜血灵球

* 该法术仅限血族使用
* 该法术为持续效果，施法者受到失去意识词条的异常状态影响将会自动解除

#### 魔法流派与消耗

* <a href="/rules/V4.x rules/8·magic/#心神之法" target="_blank">心神之法</a>
* 击发类型：<a href="/rules/V4.x rules/8·magic/#魔法的击发类型" target="_blank">定点型</a>

#### 效果

* 初始：自身本次战斗中每次由鲜血系魔法效果对他人造成的伤害及流血伤害将会被储存为等值（HP）的血液，最多10点，可以作为其他鲜血系魔法额外消耗使用。
* 10级进阶：存储上限至30点血液。每累计储存5点血液将获得2点经验值（不受其他效果影响）
* 20级进阶：储存自身因鲜血系魔法实际消耗HP一半的血液（四舍五入至整数）（包括本次施法），存储上限至60点血液。
* 30级进阶：在自身施放除血液再生/猩红再生的鲜血系魔法时，可免行动力再释放一次且享受相同过载效果且不计入过载疲劳，需要消耗本魔法储存的血液，若不足则无法释放。（血液吸取/猩红汲取的原本释放可用SP，但免费释放必须使用储存的血液。）
* 30级名称改变：猩红祭坛

## 高级魔法

### 血液过载

* 该法术为持续效果，施法者受到失去意识词条的异常状态影响将会自动解除

#### 魔法流派与消耗

* <a href="/rules/V4.x rules/8·magic/#心神之法" target="_blank">心神之法</a>
* 击发类型：<a href="/rules/V4.x rules/8·magic/#魔法的击发类型" target="_blank">定点型</a>

#### 效果

* 初始：目标每回合获得（额外消耗hp/5）点额外行动点（最多6点），代价为目标每回合要消耗（额外消耗hp/2，向上取整）点HP；HP不足时自动解除。开启后，每回合开始施法者需要再过一次本魔法检定，若鉴定失败，则中断本魔法效果。
* 10级进阶：鉴定失败时可改为本回合的回合消耗量+1倍。
* 20级进阶：现在每回合只需要消耗（额外消耗hp/3）点HP。
* 30级进阶：每回合获得额外行动点改为（额外消耗hp/4）点（最多6点）。
* 30级名称改变：猩红狂热

### 猩红飞升

* 该法术仅限血族使用
* 该法术无法使用过载也无法被其他效果缝合
* 该法术为持续效果，受到失去意识词条的异常状态影响将会自动解除

#### 魔法流派与消耗

* <a href="/rules/V4.x rules/8·magic/#心神之法" target="_blank">心神之法</a>
* 击发类型：<a href="/rules/V4.x rules/8·magic/#魔法的击发类型" target="_blank">定点型</a>

#### 效果

* 初始：需要自身处于<a href="../../status/mark/#猩红之灾" target="_blank">“猩红之灾”</a>的影响下使用，且必须额外消耗鲜血灵球/猩红祭坛中的血液才可发动（即自身15，法术15共30HP）。使鲜血系魔法获得鲜血灵球/猩红祭坛中的剩余血液量/10+4（最大10）的出目奖励；可在释放鲜血系魔法时增加剩余血液量/150+0.1（最大0.5）的总伤倍率，释放结束后消耗5鲜血灵球/猩红祭坛中的剩余血液量且该次伤害不会为其储存血液。本魔法持续一回合。
* 10级进阶：法术持续时间结束时若自身依旧处于<a href="../../status/mark/#猩红之灾" target="_blank">“猩红之灾”</a>鲜血灵球/猩红祭坛中的剩余血液量足够10点，且则自动消耗10点剩余血液量使本魔法持续时间增加一回合，并且视作成功释放了一次本魔法（即增加一次成功的经验值）。
* 20级进阶：若自身处于<a href="../../status/terrain/#血雾" target="_blank">“血雾”</a>中时，可消耗10HP免行动力立刻额外为其中的所有受影响的单位叠加2层<a href="../../status/mark/#猩红之灾" target="_blank">“猩红之灾”</a>后并触发一次结算效果（每回合限一次）。
* 30级进阶：本魔法生效时鲜血灵球/猩红祭坛的储存上限将翻倍，初始效果的出目奖励改为鲜血灵球/猩红祭坛中的剩余血液量/5+6（最大30）的出目奖励，增加总伤倍率时不再需要消耗储存血液且会正常储存。

### 猩红灾祸

* 该法术仅限血族使用
* 该法术为持续效果，施法者受到失去意识词条的异常状态影响将会自动解除，但不会驱散已有地形

#### 魔法流派与消耗

* <a href="/rules/V4.x rules/8·magic/#心神之法" target="_blank">心神之法</a>
* 击发类型：<a href="/rules/V4.x rules/8·magic/#魔法的击发类型" target="_blank">力场型</a>

#### 效果

* 初始：使自身为中心产生区域为【（检定差值/10四舍五入，最多为3）+（额外消耗/5最大3）】/3圈范围的<a href="../../status/terrain/#血雾" target="_blank">“血雾”</a>。除释放回合每回合消耗HP以自身为中心开始向外扩散该消耗/3（向上取整）圈范围，其中的单位会强制受到<a href="../../status/mark/#猩红之灾" target="_blank">“猩红之灾”</a>的影响。
* 10级进阶：<a href="../../status/terrain/#血雾" target="_blank">“血雾”</a>初始范围上限增加至【（检定差值/10四舍五入，最多为3）+（额外消耗/5最大3）】/2圈
* 20级进阶：每回合扩散速度提升至该消耗/2（向上取整）圈范围
* 30级进阶：<a href="../../status/mark/#猩红之灾" target="_blank">“猩红之灾”</a>现在对使用“猩红飞升”魔法中的单位加成效果+1倍，非血族单位的属性减少负面效果+1倍。
* 注意：驱散地形时并不会阻止下回合本魔法继续生效
---

> *DeatLvens*