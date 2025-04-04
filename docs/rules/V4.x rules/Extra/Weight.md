# 重量规则

## 物品重量的分类

物品可以简单分成以下两类：

### 轻（小）型物品

泛指那些不用多费劲就能随意取放的物品，例如瓶子、绳子、小工具等等。

特别地，那些力量阈值小于角色力量的装备，对于该角色也属于这一类物品。

取放这类物品，不需要过任何检定。若要计算这类物品的重物搬运成功难度值，一律视为0。

### 重型物品

泛指那些需要一定发力才能取放的物品，例如大箱子、大长桌、木材捆等等。

特别地，那些力量阈值大于角色力量的装备，对于该角色就属于这一类物品。

取放这类物品，需要过搬运检定，具体规则如下：

## 举起重物的具体规则

### 单独搬运

根据物品的具体重量（由TG估算）有一个成功难度值，只有检定差值大于等于这个值，才能将其搬起来。

以下是一些物品搬运成功难度值的参考：

物品举例|成功难度值
:--:|:--:
龙蛋|5
工地里常见的大箱子|10
木材捆|10
大长桌|15
室内小型装饰雕像|30
将马车抬出泥泞的地坑|50
举鼎|90
陆行舰|114514

可见有些重量很大的物品是无论如何都举不起来的，来多少人都没用。

### 联合搬运

在一个人无法单独搬运重物的时候，你可以找同伴来帮忙，具体规则如下：

* 帮忙人数存在上限，每个重物都不一样，具体由TG指定
* 所有人过搬运，除非大失败，每个人搬运的保底检定差值为0，就算失败也是0
* 将所有人的保底检定差值累加，若总值大于物品搬运成功难度值，就算搬运成功

## 如何举起一个角色

想要举起一个人怎么办？同样可以把人的重量转化为一个物品搬运成功难度值，具体规则如下：

一个人等价的物品搬运成功难度值=这个人的体质属性/2+这个人全身装备力量阈值的平均值。

你可以请帮手来一起搬运一个人，但对于一个占地1格的角色来说，你最多只能请2名帮手。

如果被举起者不挣扎，则当成普通物品处理即可；若被举起者挣扎，那么举起他需要用你的搬运检定对抗他的抵抗检定，将双方差值的差值再与搬运成功难度值作比较。

一旦成功把一个人举起来，如果被举起者不挣扎，则当成普通物品处理即可；若被举起者挣扎，则涉及的所有相关角色同步进入<a href="../../../data/status/normal/#束缚" target="_blank">“束缚”</a>状态，举人者视为束缚者，被举起者视为被束缚者。特别地，你（们）无法在此状态下执行束缚者的行动1，但是你可以与涉及的所有相关角色一起移动，此时所有束缚者都需要消耗行动点。

## 举起重物之后

### 移动

你可以让你举起的重物和你一起移动，但代价是移动消耗的行动点+1倍。

### 抛掷

你可以花费2行动点，将你举起的重物抛出去。抛掷范围和抛掷威力见下表。

若抛掷目标为地块，过普通搬运检定即可。

若抛掷目标为角色或障碍物，则相当于你用武器威力为（抛掷威力）的武器对目标进行了一次远程进攻，进攻检定为你的搬运检定，不计算你的衰减，无法使用远程武器的通用技能。若对方选择拼刀，就算距离足够，也只能损坏抛来的重物，无法进入正常的拼刀流程。

抛掷物类型|抛掷范围|抛掷威力|备注
:--:|:--:|:--:|:--:
近战武器|3+（力量-力量阈值）/10|面板武器威力+面板力量阈值/10|武器会被丢弃在目标地块或目标所在地块
远程武器|3+（力量-力量阈值）/10|面板力量阈值/10|武器会被丢弃在目标地块或目标所在地块
防具|3+（力量-力量阈值）/10|面板护甲值+面板力量阈值/10|防具会被丢弃在目标地块或目标所在地块
角色|3+（力量-重物搬运成功难度值）/10（至少为1）|重物搬运成功难度值/3|会对抛出的角色造成（重物搬运成功难度值/3+检定差值因子）点固伤
普通重物|3+（力量-重物搬运成功难度值）/10（至少为1）|重物搬运成功难度值/3|重物会被丢弃在目标地块或目标所在地块

若为联合搬运，则可选择任意一人进行检定，取结果较好的那个。

### 放下

有两种办法可以放下你举起的重物：

* 直接扔下：不消耗行动点，如果是角色则会受到1d5点固伤，若是物品则有可能损坏
* 轻拿轻放：消耗2点行动点
