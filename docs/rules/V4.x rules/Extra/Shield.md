# 盾类武器规则

盾类武器是特殊的攻防一体武器，相比其他类型的武器，盾类武器拥有更多的特性以及检定流程。

## 盾类武器的属性

盾类武器除了普通武器都有的属性以外，还具有以下四种额外属性：

* 最大格挡值：代表你的盾最多能承受多少伤害，其数值与盾的面板武器威力有关
* 当前格挡值：代表你的盾还能承受多少伤害，使用盾牌会消耗当前格挡值，初始当前格挡值=最大格挡值
* 盾牌护甲值：代表你的盾能减免多少伤害，默认情况下盾牌护甲值=盾的面板武器威力的一半，视为一种防具护甲值
* 格挡恢复值：每回合你的行动轮开始时，若盾牌没有损坏，盾牌的“当前格挡值”会恢复该值

盾类武器的相关属性也会受到某些针对防具属性能力的影响。具体来说，除非特殊说明，盾的“格挡值”与防具的“额外生命”等价，盾的“盾牌护甲值”与防具的“护甲值”等价。若一个能力对防具的减伤率有影响，则这点在盾牌这边无效。

## 盾类武器的功用

盾类武器作为一种武器，你当然可以用它来做其他武器都能做的事：进攻。

不过，盾类武器的真正用途还是在于其阻挡伤害的能力，具体流程如下：

### 盾牌防守流程

当你手持盾牌，无论盾牌是主武器还是副武器，受到来自正面的进攻时（无论近远物理魔法），除了常规防守流程以外，多一种防守流程：使用你的盾牌检定对抗对方的进攻检定（会受到非惯用手的惩罚）。这种防守流程视为“防御”（但没有防御的默认效果），计算的是盾牌的进攻衰减。

如果你盾牌检定对抗成功，对方造成的伤害会按照公式扣除到你盾牌的“当前格挡值”上，不计算防具的护甲值和减伤，且视为对方攻击到了你名为“盾牌”的部位；如果你对抗失败，则不但你盾牌的“当前格挡值”会受到伤害，且原伤害的一半还会反馈到你的HP上。

敌人可以通过瞄准你的盾牌部位来强制对你的盾牌造成伤害。此时，你只能走盾牌防守的流程。

### 不同攻击手段对伤害的影响

并不是所有攻击手段都能对盾牌造成完整的伤害，只有那些特化的武器以及魔法才能高效率地拆盾。

默认情况下，不同攻击手段的对盾伤害倍率如下：

* 近战物理攻击：0.5倍
* 远程物理攻击：0.2倍
* 魔法攻击：1.0倍

特定的武器类型对盾伤害倍率有所不同：

* 短棍：0.8倍
* 鞭：0.2倍
* 长枪：0.8倍
* 长戟：0.8倍
* 所有重型武器：1.0倍

注意，此伤害倍率是在其他伤害倍率做完加算后，再做乘算。

### 盾牌阻挡伤害公式

!!! success "盾牌阻挡伤害公式"
    对盾牌格挡值造成的伤害=基础伤害×攻击手段伤害倍率

    其中，盾牌护甲值视为防具护甲值，计算在基础伤害公式中

### 盾牌损坏

盾牌的“当前格挡值”会降低到0或以下，此时，盾的所有被动效果失效，你无法再主动走盾牌防守的流程，也无法用盾做其他事，而敌人则可以通过瞄准盾牌部位继续对盾牌造成伤害。特别地，如果你的盾牌的“当前格挡值”减少到“负最大格挡值”及以下，视为你的盾牌损坏，你将自动收起盾牌，这场战斗将无法继续使用。

战斗结束，盾牌的“当前格挡值”回满，无论是否被损坏。