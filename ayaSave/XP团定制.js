// ==UserScript==
// @name         XP团定制
// @author       苦叶茶
// @version      240201+b
// @license      WTFPL
// @homepageURL  https://xp-wiki.netlify.app/
// ==/UserScript==

let ext = seal.ext.find('xp');
if (!ext) {
	ext = seal.ext.new('xp', '苦叶茶', '1.0.0');
	seal.ext.register(ext);
}
const storage_dir = "data/default/extensions/xp/"

// 存储所有活动的定时器ID
let activeTimeouts = [];

// 从活动定时器列表中移除指定的定时器ID
function removeTimeout(timeoutId) {
    const index = activeTimeouts.indexOf(timeoutId);
    if (index > -1) {
        activeTimeouts.splice(index, 1);
    }
}


function cancelAllTimeouts(ctx, msg) {
    if (activeTimeouts.length === 0) {
        seal.replyToSender(ctx, msg, "当前没有正在运行的倒计时任务");
        return;
    }
    
    // 取消所有定时器
    activeTimeouts.forEach(timeoutId => {
        clearTimeout(timeoutId);
    });
    
    // 获取取消的定时器数量
    const count = activeTimeouts.length;
    
    // 清空活动定时器列表
    activeTimeouts = [];
    
    // 发送取消确认消息
    seal.replyToSender(ctx, msg, `已成功取消所有 ${count} 个倒计时任务`);
}

// ↓↓↓↓↓↓处理特殊效果的函数↓↓↓↓↓↓
function effectsTreatment(specialEffects,uniqueEffects)
{
	const allEffects = [...specialEffects];

	const remainingUnique = [...uniqueEffects];
    
    for (let i = remainingUnique.length - 1; i >= 0; i--) 
	{
		const u = remainingUnique[i];
        
		// 新增：过滤属性增益上限升级
		if (u.效果.includes("属性增益上限+2")) {
			remainingUnique.splice(i, 1);
			continue;
		}

        // 处理特殊效果显示
        if (u.已使用次数 >= 1) {
            // 弓
            if (u.效果.includes("在武器攻击范围/2的范围内进行的射击，进攻阈值+4")) 
			{
                u.效果 = `在武器攻击范围/2的范围内进行的射击，进攻阈值+${4 * u.已使用次数}`;
            }
			else if (u.效果.includes("射击射程超过范围的目标时，消耗行动点倍率不再+0.5（长弓限定）")) 
			{
				const origin = allEffects.findIndex(e => e.startsWith('射程超过范围仍然可以射击，但消耗行动点倍率+0.5，且总伤倍率减半'));
				allEffects[origin] = `射程超过范围仍然可以射击，但总伤倍率减半`;
				remainingUnique.splice(i, 1);
            }
            // 弩
            else if (u.效果.includes("提升1点装弹量上限")) 
			{
				const count = u.已使用次数;
				const ammoIndex = allEffects.findIndex(e => e.startsWith('装弹量上限：'));
				if (ammoIndex !== -1) 
				{
                	const current = parseInt(allEffects[ammoIndex].split('：')[1]);
                	allEffects[ammoIndex] = `装弹量上限：${current + count}`;
            	} 
				else 
				{
                	allEffects.push(`装弹量上限：${count}`);
            	}
				remainingUnique.splice(i, 1);
            }
			// 投掷（飞镖）
			else if (u.效果.includes("涂抹药物后，对方抵抗判定异常状态获得+4惩罚")) 
			{
				const origin = allEffects.findIndex(e => e.startsWith('涂抹药物后，对方抵抗判定异常状态获得+8惩罚'));
				if(origin !== -1)
				{
					allEffects[origin] = `涂抹药物后，对方抵抗判定异常状态获得+${8 + 4 * u.已使用次数}惩罚`;
					remainingUnique.splice(i, 1);
				}
				else
				{
					u.效果 = `涂抹药物后，对方抵抗判定异常状态获得+${4 * u.已使用次数}惩罚`;
				}
            }	
            else if (u.效果.includes("可选择最多的连发次数+1（效果与弩系武器升级技能中的连射类似）")) 
			{
				const origin = allEffects.findIndex(e => e.startsWith('可选择最多两连发（效果与弩系武器升级技能中的连射类似）'));
				if(origin !== -1)
				{
					allEffects[origin] = `可选择最多三连发（效果与弩系武器升级技能中的连射类似）`;
					remainingUnique.splice(i, 1);
				}
				else
				{
					u.效果 = `可选择最多两连发（效果与弩系武器升级技能中的连射类似）`;
				}
            }
			// 发射器（暂时无特殊处理）

			// 火器（暂时无特殊处理）

			// 格斗（拳套）
			else if (u.效果.includes("每有1层蓄力层数，下一次攻击检定阈值+3")) 
			{
                u.效果 = `每有1层蓄力层数，下一次攻击检定阈值+${3 * u.已使用次数}`;
            }
			else if (u.效果.includes("攻击若成功，对目标防具的额外生命造成额外1点伤害（指虎限定）")) 
			{
                u.效果 = `攻击若成功，对目标防具的额外生命造成额外${u.已使用次数}点伤害（指虎限定）`;
            }
			else if (u.效果.includes("作为主武器时，防御检定再有额外-4奖励（铁臂环限定）")) 
			{
				const origin = allEffects.findIndex(e => e.startsWith('作为主武器时，防御检定有-4奖励'));
				if(origin !== -1)
				{
					allEffects[origin] = `作为主武器时，防御检定有-${4 + 4 * u.已使用次数}奖励`;
					remainingUnique.splice(i, 1);
				}
				else
				{
					u.效果 = `作为主武器时，防御检定有-${4 * u.已使用次数}奖励`;
				}
            }
			// 爪
			else if (u.效果.includes("攻击若造成伤害，让对方抵抗判“流血”，其中叠加层数改为1层")) //这个匕首也有
			{
				if(u.已使用次数 == 2)
				{
					u.效果 = `攻击若造成伤害，让对方抵抗判“流血”`;
				}
            }
			else if (u.效果.includes("对方抵抗爪类武器附加的“撕裂”效果时，检定值获得+4惩罚")) 
			{
                u.效果 = `对方抵抗爪类武器附加的“撕裂”效果时，检定值获得+${4 * u.已使用次数}惩罚`;
            }
			else if (u.效果.includes("进行特殊战技检定时，检定值再可获得额外-4奖励（臂刃限定）")) 
			{
				const origin = allEffects.findIndex(e => e.startsWith('进行特殊战技检定时，检定值可获得-4奖励'));
				if(origin !== -1)
				{
					allEffects[origin] = `进行特殊战技检定时，检定值可获得-${4 + 4 * u.已使用次数}奖励`;
					remainingUnique.splice(i, 1);
				}
				else
				{
					u.效果 = `进行特殊战技检定时，检定值可获得-${4 * u.已使用次数}奖励`;
				}
            }
			// 匕首
			else if (u.效果.includes("对措手不及的目标发动的攻击，进攻阈值+4")) 
			{
                u.效果 = `对措手不及的目标发动的攻击，进攻阈值+${4 * u.已使用次数}`;
            }
			// 杖
			else if (u.效果.includes("指定某魔法，令其阈值+4")) 
			{
                u.效果 = `指定某魔法，令其阈值+${4 * u.已使用次数}`;
            }
			else if (u.效果.includes("因弱点而进行魔法抗性对抗时，检定获得-4奖励（御币限定）")) 
			{
                u.效果 = `因弱点而进行魔法抗性对抗时，检定获得-${4 * u.已使用次数}奖励（御币限定）`;
            }
			// 打刀
			else if (u.效果.includes("应对攻击距离比自己长的近战武器时，检定值阈值+4")) 
			{
                u.效果 = `应对攻击距离比自己长的近战武器时，检定值阈值+${4 * u.已使用次数}`;
            }
			// 长刀
			else if (u.效果.includes("暴击阈值+2")) 
			{
                u.效果 = `暴击阈值+${2 * u.已使用次数}`;
            }
			// 剑
			else if (u.效果.includes("拼刀时，检定阈值+4")) 
			{
                u.效果 = `拼刀时，检定阈值+${4 * u.已使用次数}`;
            }
			else if (u.效果.includes("作为主武器时，防御检定再-4奖励（佩剑限定）")) 
			{
                const origin = allEffects.findIndex(e => e.startsWith('作为主武器时，防御检定有-4奖励'));
				if(origin !== -1)
				{
					allEffects[origin] = `作为主武器时，防御检定有-${4 + 4 * u.已使用次数}奖励`;
					remainingUnique.splice(i, 1);
				}
				else
				{
					u.效果 = `作为主武器时，防御检定有-${4 * u.已使用次数}奖励`;
				}
            }
			else if (u.效果.includes("暴击阈值+2（刺突剑限定）")) 
			{
                u.效果 = `暴击阈值+${2 * u.已使用次数}（刺突剑限定）`;
            }
			else if (u.效果.includes("暴击后总伤倍率+0.1（重剑限定）")) 
			{
                u.效果 = `暴击后总伤倍率+${0.1 * u.已使用次数}（重剑限定）`;
            }
			// 短棍（暂时无特殊处理）
			
			// 鞭
			else if (u.效果.includes("“鞭痕”最大叠加层数+1")) 
			{
                u.效果 = `“鞭痕”最大叠加层数+${u.已使用次数}`;
            }
			// 长枪
			else if (u.效果.includes("若攻击检定成功，额外附加1点固定伤害（矛限定）")) 
			{
                const origin = allEffects.findIndex(e => e.startsWith('若攻击检定成功，附加2点固定伤害'));
				if(origin !== -1)
				{
					allEffects[origin] = `若攻击检定成功，附加${2 + u.已使用次数}点固定伤害`;
					remainingUnique.splice(i, 1);
				}
				else
				{
					u.效果 = `若攻击检定成功，附加${u.已使用次数}点固定伤害`;
				}
            }
			// 长柄刀
			else if (u.效果.includes("进攻作用目标数超过2人时，检定阈值+4")) 
			{
                u.效果 = `“进攻作用目标数超过2人时，检定阈值+${4 * u.已使用次数}`;
            }
			// 长戟
			else if (u.效果.includes("对方抵抗长戟造成的异常状态时，检定阈值-4")) 
			{
                u.效果 = `“对方抵抗长戟造成的异常状态时，检定阈值-${4 * u.已使用次数}`;
            }
			else if (u.效果.includes("进攻直线路径上的敌人时，检定再有额外-4奖励（三叉戟限定）")) 
			{
                const origin = allEffects.findIndex(e => e.startsWith('进攻直线路径上的敌人时，检定有-4奖励'));
				if(origin !== -1)
				{
					allEffects[origin] = `进攻直线路径上的敌人时，检定有-${4 + 4 * u.已使用次数}奖励`;
					remainingUnique.splice(i, 1);
				}
				else
				{
					u.效果 = `进攻直线路径上的敌人时，检定有-${4 * u.已使用次数}奖励`;
				}
            }
			// 棍
			else if (u.效果.includes("无论进攻成功与否，都对目标造成1点SP伤害")) 
			{
                u.效果 = `“无论进攻成功与否，都对目标造成${u.已使用次数}点SP伤害`;
            }
			// 镰刀
			else if (u.效果.includes("暴击阈值+2")) //大锤也有这个
			{
                u.效果 = `“暴击阈值+${2 * u.已使用次数}`;
            }
			else if (u.效果.includes("暴击后总伤倍率+0.1")) //巨剑也有这个
			{
                u.效果 = `“暴击后总伤倍率+${0.1 * u.已使用次数}`;
            }
			// 巨剑
			else if (u.效果.includes("作为主武器时，防御检定再有额外-4奖励（巨剑限定）")) 
			{
                const origin = allEffects.findIndex(e => e.startsWith('作为主武器时，防御检定有-4奖励'));
				if(origin !== -1)
				{
					allEffects[origin] = `作为主武器时，防御检定有-${4 + 4 * u.已使用次数}奖励`;
					remainingUnique.splice(i, 1);
				}
				else
				{
					u.效果 = `作为主武器时，防御检定有-${4 * u.已使用次数}奖励`;
				}
            }
			else if (u.效果.includes("拼刀时，进攻检定有-4奖励（双手重剑限定）")) 
			{
                const origin = allEffects.findIndex(e => e.startsWith('拼刀时，进攻检定有-4奖励'));
				if(origin !== -1)
				{
					allEffects[origin] = `拼刀时，进攻检定有-${4 + 4 * u.已使用次数}奖励`;
					remainingUnique.splice(i, 1);
				}
				else
				{
					u.效果 = `拼刀时，进攻检定有-${4 * u.已使用次数}奖励`;
				}
            }
			// 大锤（暂时无特殊处理）

			// 战斧
			else if (u.效果.includes("进攻目标身后（特指你与目标构成的直线）是障碍物时，进攻检定阈值+4"))
			{
                u.效果 = `“进攻目标身后（特指你与目标构成的直线）是障碍物时，进攻检定阈值+${4 * u.已使用次数}`;
            }
			// 轻盾
			else if (u.效果.includes("进攻成功时额外对敌人造成1点固定伤害")) 
			{
                u.效果 = `“进攻成功时额外对敌人造成${u.已使用次数}点固定伤害`;
            }
			// 长盾
			else if (u.效果.includes("只要手持（无论主副武器），防御成功时提供全身1点临时护甲")) 
			{
                u.效果 = `“只要手持（无论主副武器），防御成功时提供全身${u.已使用次数}点临时护甲`;
            }
			// 巨盾（暂时无特殊处理）
        }
    }
    remainingUnique.forEach(u => {
        allEffects.push(u.效果);
    });
    return allEffects;
}
// ↑↑↑↑↑↑处理特殊效果的函数↑↑↑↑↑↑

const cmd1 = seal.ext.newCmdItemInfo();
cmd1.name = 'dmg';
cmd1.help = '自动计算伤害';
cmd1.solve = (ctx, msg, cmdArgs) => {
	let text = "对抗伤害计算：\n";
	let diff = seal.vars.intGet(ctx, "$g上次对抗差值")[0];
	const pattern = seal.vars.strGet(ctx, "$g上次击中部位")[0];
	const player1 = seal.vars.strGet(ctx, "$g上次对抗玩家A");
	const player2 = seal.vars.strGet(ctx, "$g上次对抗玩家B");
	const winflag = seal.vars.intGet(ctx, "$g上次对抗结果")[0];
	if (!player1[1] || !player2[1]) {
		text += `没有进行过对抗！`;
	}
	else {
		const mctx1 = seal.getCtxProxyByUid(ctx, player1[0]);
		const mctx2 = seal.getCtxProxyByUid(ctx, player2[0]);
		let winner = null, loser = null;
		if (winflag > 0) {
			// 后手胜利
			winner = mctx2;
			loser = mctx1;
			diff *= -1
		}
		else {
			// 先手胜利
			winner = mctx1;
			loser = mctx2;
		}
		// 取参数并计算
		function get_player_attr(mctx, name) {
			const p = seal.vars.intGet(mctx, name)[0] + 0.0;
			const d = seal.vars.intGet(mctx, name + "除数")[0];
			return 0 != d ? p / d : p;
		}
		const pattern_map = [
			"皮鼓",
			"头部",
			"左手",
			"右手",
			"躯干",
			"左脚",
			"右脚",
		];
		const ptn1 = seal.vars.intGet(mctx1, "瞄准部位");
		const pattern_f = ptn1[1] ? pattern_map[ptn1[0] % pattern_map.length] : pattern;
		const pwr1 = get_player_attr(mctx1, "威力"),
			pwr2 = get_player_attr(mctx2, "威力"),
			arm2 = get_player_attr(mctx2, pattern_f + "护甲"),
			def2 = get_player_attr(mctx2, pattern_f + "减伤") / 100.0;
		let fac_pwr1 = get_player_attr(mctx1, "威力倍率") / 100.0,
			fac_diff = get_player_attr(mctx1, "因子倍率") / 100.0,
			fac_sum = get_player_attr(mctx1, "总伤倍率") / 100.0,
			add_sum = get_player_attr(mctx1, "额外伤害");
		fac_pwr1 = fac_pwr1 > 0 ? fac_pwr1 : 1;
		fac_diff = fac_diff > 0 ? fac_diff : 1;
		fac_sum = fac_sum > 0 ? fac_sum : 1;
		const fix1 = seal.vars.intGet(mctx1, "检定补正")[0],
			fix2 = seal.vars.intGet(mctx2, "检定补正")[0];
		const factor = Math.floor((diff - (fix1 - fix2)) / 10);
		let dmg = (pwr1 * fac_pwr1 + factor * fac_diff + add_sum - arm2) * fac_sum,
			dmg_vs = (pwr1 * fac_pwr1 + factor * fac_diff + add_sum - arm2 - pwr2 / 2) * fac_sum,
			dmg_mgc = (pwr1 * fac_pwr1 + factor * fac_diff + add_sum) * fac_sum;
		dmg = Math.max(dmg, 0);
		dmg_mgc = Math.max(dmg_mgc, 0);
		// 文本生成
		text += `对抗双方为<${mctx1.player.name}>、<${mctx2.player.name}>，胜者是<${winner.player.name}>！\n`
		text += `差值伤害因子为${factor}，击中部位为${pattern_f}！\n`;
		text += `进攻威力为${pwr1}，防守威力为${pwr2}！\n`;
		text += `防守${pattern_f}护甲值为${arm2}，${pattern_f}减伤率为${def2}！\n`;
		text += `额外伤害${add_sum}，威力倍率${fac_pwr1}，因子倍率${fac_diff}，总伤倍率${fac_sum}！\n`;
		text += `进攻检定补正为${fix1}，防守检定补正为${fix2}！\n`;
		const tablen = 10, tabchr = ' ';
		text += "\n" + "　　　　|".padStart(tablen, tabchr)
				+ "护甲|".padStart(tablen, tabchr) + "血量|".padStart(tablen, tabchr);
		text += "\n" + "闪避失败|".padStart(tablen, tabchr)
				+ `${(dmg * def2).toFixed(2)}|`.padStart(tablen, tabchr)
				+ `${(dmg * (1.0 - def2)).toFixed(2)}|`.padStart(tablen, tabchr);
		text += "\n" + "防御成功|".padStart(tablen, tabchr)
				+ `${(dmg * 0.25 * def2).toFixed(2)}|`.padStart(tablen, tabchr)
				+ `${(dmg * 0.25 * (1.0 - def2)).toFixed(2)}|`.padStart(tablen, tabchr);
		text += "\n" + "防御失败|".padStart(tablen, tabchr)
				+ `${(dmg * 0.75 * def2).toFixed(2)}|`.padStart(tablen, tabchr)
				+ `${(dmg * 0.75 * (1.0 - def2)).toFixed(2)}|`.padStart(tablen, tabchr);
		text += "\n" + "魔法成功|".padStart(tablen, tabchr)
				+ `${(0).toFixed(2)}|`.padStart(tablen, tabchr)
				+ `${(dmg_mgc).toFixed(2)}|`.padStart(tablen, tabchr);
		text += "\n" + "　　拼刀|".padStart(tablen, tabchr)
				+ `${(dmg_vs * def2).toFixed(2)}|`.padStart(tablen, tabchr)
				+ `${(dmg_vs * (1.0 - def2)).toFixed(2)}|`.padStart(tablen, tabchr);
		// 参数重置
		seal.vars.del(mctx1, "检定补正");
		seal.vars.del(mctx2, "检定补正");
		seal.vars.del(mctx1, "瞄准部位");
		seal.vars.del(mctx2, "瞄准部位");
	}
	seal.replyToSender(ctx, msg, text);
	return seal.ext.newCmdExecuteResult(true);
};
ext.cmdMap['dmg'] = cmd1;

const cmd2 = seal.ext.newCmdItemInfo();
cmd2.name = '投稿';
cmd2.help = '应用当前最新XP团角色与XP团设定数据库';
cmd2.solve = (ctx, msg, cmdArgs) => {
	if (ctx.privilegeLevel < 100) {
		return seal.ext.newCmdExecuteResult(false);
	}
	// 拉取
	seal.replyToSender(ctx, msg, "正在拉取……");
	let text = exec_cmd("git", ...("-C xp-wiki/ pull origin master --rebase".split(' ')));
	console.log(text);

	seal.replyToSender(ctx, msg, "正在生成……");
	// 读取1
	let csv = read_file("xp-wiki/site/temp/qbot/characters.csv").replace("\r\n", "\n");
	let data = [];
	const records1 = csv.split("\n");
	for (var i = 1; i < records1.length; ++i) {
		if (records1[i].length <= 0) {
			continue;
		}
		let record = records1[i].split(",");
		if (null == record[2] || record[2].length <= 0) {
			record.splice(2, 1);
		}
		else {
			record[2] = "相关战役：".concat(record[2]);
		}
		if (null == record[1] || record[1].length <= 0) {
			record.splice(1, 1);
		}
		else {
			record[1] = "PL：".concat(record[1]);
		}
		data.push(record.join("\r\n"));
	}
	if (data.length > 0) {
		mkdir(storage_dir);
		write_file(storage_dir + "characters.json", JSON.stringify(data));
	}

	// 读取2
	csv = read_file("xp-wiki/site/temp/qbot/tips.csv").replace("\r\n", "\n");
	data = [];
	const records2 = csv.split("\n");
	for (var i = 1; i < records2.length; ++i) {
		if (records2[i].length <= 0) {
			continue;
		}
		let record = records2[i].split(",");
		for (var j = 0; j < record.length; ++j) {
			record[j] = record[j].replace("\\n", "\r\n");
		}
		data.push(record.join("\r\n"));
	}
	if (data.length > 0) {
		mkdir(storage_dir);
		write_file(storage_dir + "tips.json", JSON.stringify(data));
	}

	text = exec_cmd("git", ...("-C xp-wiki/ rev-parse HEAD".split(' ')));
	seal.replyToSender(ctx, msg, "生成完成！当前版本：" + text);
	return seal.ext.newCmdExecuteResult(true);
};
ext.cmdMap['投稿'] = cmd2;

const cmd3 = seal.ext.newCmdItemInfo();
cmd3.name = 'XP团角色';
cmd3.help = '';
cmd3.solve = (ctx, msg, cmdArgs) => {
	let data = JSON.parse(read_file(storage_dir + "characters.json"));
	let history = [];
	let history_data = seal.vars.strGet(ctx, "$g_characters_history");
	if (history_data[1]) {
		history = JSON.parse(history_data[0]);
	}

	let i = 0;
	do {
		i = Math.floor(Math.random() * data.length);
	} while (history.indexOf(i) >= 0);
	history.push(i);
	history.splice(0, history.length - data.length / 2);

	console.log(history);
	seal.vars.strSet(ctx, "$g_characters_history", JSON.stringify(history));
	let text = "关于XP团往期角色：" + data[i];

	seal.replyToSender(ctx, msg, text);
	return seal.ext.newCmdExecuteResult(true);
};
ext.cmdMap['XP团角色'] = cmd3;

const cmd4 = seal.ext.newCmdItemInfo();
cmd4.name = 'XP团';
cmd4.help = '';
cmd4.solve = (ctx, msg, cmdArgs) => {
	let data = JSON.parse(read_file(storage_dir + "tips.json"));
	let history = [];
	let history_data = seal.vars.strGet(ctx, "$g_tips_history");
	if (history_data[1]) {
		history = JSON.parse(history_data[0]);
	}

	let i = 0;
	do {
		i = Math.floor(Math.random() * data.length);
	} while (history.indexOf(i) >= 0);
	history.push(i);
	history.splice(0, history.length - data.length / 2);

	console.log(history);
	seal.vars.strSet(ctx, "$g_tips_history", JSON.stringify(history));
	let text = "关于艾克苏普世界的小知识：\n" + data[i];

	seal.replyToSender(ctx, msg, text);
	return seal.ext.newCmdExecuteResult(true);
};
ext.cmdMap['XP团'] = cmd4;

const cmd5 = seal.ext.newCmdItemInfo();
cmd5.name = '随机武器';
cmd5.help = '随机抽取一个武器，格式如下：\n.随机武器 模式 名称 等级\n模式：0-全随机，1-按大类随机，2-按武器系随机，3-按武器变体随机\n名称：模式为1/2/3时，指定目标名称\n等级：1-15（未实装）\n示例：.随机武器 1 远程武器 10';
cmd5.solve = (ctx, msg, cmdArgs) => {
	let mode = cmdArgs.getArgN(1);
	let name = cmdArgs.getArgN(2);
	let level = cmdArgs.getArgN(3);
	// 参数有效性检查
    if (!mode || !name || !level) {
        seal.replyToSender(ctx, msg, "随机抽取一个武器，格式如下：\n.随机武器 模式 名称 等级\n模式：0-全随机，1-按大类随机，2-按武器系随机，3-按武器变体随机\n名称：模式为1/2/3时，指定目标名称\n等级：1-15（未实装）\n示例：.随机武器 1 远程武器 10");
        return seal.ext.newCmdExecuteResult(true);
    }
	// 转换数字类型参数
    const numMode = parseInt(mode);
    const numLevel = parseInt(level);
    if (isNaN(numMode) || isNaN(numLevel)) {
        seal.replyToSender(ctx, msg, "模式和等级必须是数字");
        return seal.ext.newCmdExecuteResult(true);
    }

	const encodedName = encodeURIComponent(name);

	const url = `http://localhost:3000/weapon?mode=${numMode}&name=${encodedName}&level=${numLevel}`;

	let text = "随机武器结果：\n";

	fetch(url)
                .then((response) => {
                    // 判断响应状态码是否为 200
                    if (response.ok) {
                        return response.json();
                    } 
					else if(response.status == 404)
					{
						text += `未找到武器信息！`;
						seal.replyToSender(ctx, msg, text);
					}
					else
					{
                        console.log("api失效！请联系作者。");
                    }
                })
                .then((data) => {
					const category = data.weaponInfo ? data.weaponInfo.大类 : '未知大类'; // 获取第一列
            		if (data.success) {
						text += `等级：${numLevel || '未知'}  |  `;
						text += `武器大类：${category || '未知'}  |  `;
						text += `武器系：${data.weaponInfo.子类 || '未知'}\n`;
						text += `挂钩属性：${data.weaponInfo.挂钩属性 || '未知'}  |  `;
						text += `力量阈值：${data.weaponInfo.力量阈值 || '未知'}  |  `;
						text += `变体：${data.weaponInfo.变体 || '未知'}\n`;

						let attackRange = data.weaponInfo.攻击范围 || '未知';
						// 长枪特殊处理
						if (data.weaponInfo.子类 === '长枪' && 
    						data.weaponInfo.独特升级?.some(u => u.效果.includes('攻击范围不再限定直线'))) {
    						attackRange = attackRange.toString().replace(/直线/g, '');
						}
						text += `攻击范围：${attackRange}  |  `;

						text += `武器威力：${data.weaponInfo.武器威力 || '未知'}\n`;
						if(data.weaponInfo.施法范围 > 1)
						{
							text += `施法范围：${data.weaponInfo.施法范围 || '未知'}\n`;
						}
						if(data.weaponInfo.初始弹药量 > 0)
						{
							if(data.weaponInfo.子类 == '短棍') {
        						let totalAmmo = data.weaponInfo.初始弹药量 || 0;
        						// 新的检测逻辑开始
        						if (data.weaponInfo.独特升级?.length) {
            						const combatUpgrades = data.weaponInfo.独特升级.filter(u => 
                						u.效果.includes("战技使用次数+1")
            						);
            						totalAmmo += combatUpgrades.reduce((sum, u) => sum + u.已使用次数, 0);
									data.weaponInfo.独特升级 = data.weaponInfo.独特升级.filter(u => 
            							!u.效果.includes("战技使用次数+1")
        							);
        						}
        						// 新检测逻辑结束
        						text += `战技使用次数：${totalAmmo}\n`;
    						}
							else if(data.weaponInfo.变体 == '短斧' || data.weaponInfo.变体 == '手戟')
							{
								text += `备用武器最大持有量：${data.weaponInfo.初始弹药量 || '未知'}\n`;
							}
							else
							{
								text += `初始弹药量：${data.weaponInfo.初始弹药量 || '未知'}\n`;
							}	
						}
						seal.replyToSender(ctx, msg, text);	
						//--------------------以下是特殊效果的处理--------------------
						text = "";
						const specialEffects = data.weaponInfo.特殊效果 
    						? data.weaponInfo.特殊效果.split('\n').filter(line => line.trim() !== '无特效')  // 拆分并过滤空行
    						: [];  // 默认值处理
						// 添加独特升级效果
						const allEffects = effectsTreatment(specialEffects,data.weaponInfo.独特升级);
						text += "特殊效果：\n";
						if (allEffects.length > 0) 
						{
    						allEffects.forEach((effect, index) => {
        						text += `${index + 1}. ${effect}\n`;
    						});
						} 
						else 
						{
							if(data.weaponInfo.是否有属性加成 == 0)
							{
								text += "无特效\n";
							}
						}
						//--------------------以下是属性加成的处理--------------------	
						if(data.weaponInfo.是否有属性加成 > 0)
						{
							text += `有属性加成\n`;
							if(data.weaponInfo.属性加成.力量>0)
							{
								text += `力量+${data.weaponInfo.属性加成.力量}，`;
							}
							if(data.weaponInfo.属性加成.敏捷>0)
							{
								text += `敏捷+${data.weaponInfo.属性加成.敏捷}，`;
							}
							if(data.weaponInfo.属性加成.体质>0)
							{
								text += `体质+${data.weaponInfo.属性加成.体质}，`;
							}
							if(data.weaponInfo.属性加成.智力>0)
							{
								text += `智力+${data.weaponInfo.属性加成.智力}，`;
							}
							if(data.weaponInfo.属性加成.魅力>0)
							{
								text += `魅力+${data.weaponInfo.属性加成.魅力}，`;
							}
							if(data.weaponInfo.属性加成.魔力>0)
							{
								text += `魔力+${data.weaponInfo.属性加成.魔力}\n`;
							}
						}
            		} else {
                		text += `随机失败，失败原因：${data.error || "未知错误"}`;
            		}
					seal.replyToSender(ctx, msg, text);
					//--------------------以下是升级记录的处理--------------------
					if(numLevel > 1)
					{
						seal.replyToSender(ctx, msg, `升级记录：\n${data.upgradeLog.join('\n')}`);
					}
					//--------------------以下是印痕记录的处理--------------------
					text = "";
					if (data.weaponInfo.印痕?.length > 0)
					{
						text += "\n印痕效果：\n";
						data.weaponInfo.印痕.forEach((m, idx) => {
							const countText = m.count > 1 ? `【${m.count}次】` : '';
							// 修改后的共鸣刻痕处理
							if (m.name === '共鸣刻痕' && data.weaponInfo.共鸣属性?.length > 0) 
							{
								// 统计属性出现次数
								const attrCounts = data.weaponInfo.共鸣属性.reduce((acc, attr) => {
									acc[attr] = (acc[attr] || 0) + 1;
									return acc;
								}, {});
								// 生成属性描述
								const attrDesc = Object.entries(attrCounts)
									.map(([attr, count]) => `${attr}+${count}`)
									.join('、');
								text += `${idx + 1}. ${m.name}：${attrDesc}${countText}\n`;
							}
							else if(m.name === '减重刻痕') 
							{
								text += `${idx + 1}. ${m.name}：力量阈值-${5 * m.count}${countText}\n`;
							}
							else if(m.name === '扩容刻痕') 
							{
								text += `${idx + 1}. ${m.name}：初始弹药量+${2 * m.count}${countText}\n`;
							}
							else if(m.name === '及远刻痕') 
							{
								text += `${idx + 1}. ${m.name}：射程+${m.count}${countText}\n`;
							}
							else if(m.name === '魔感刻痕') 
							{
								text += `${idx + 1}. ${m.name}：施法范围+${m.count}${countText}\n`;
							}
							else if(m.name === '特异刻痕') 
							{
								text += `${idx + 1}. ${m.name}：获得${m.count}点独特升级点（待分配）${countText}\n`;
							}
							else if(m.name === '奇崛刻痕') 
							{
								text += `${idx + 1}. ${m.name}：获得${2 * m.count}点独特升级点（待分配）${countText}\n`;
							}
							else if(m.name === '省悟刻痕') 
							{
								text += `${idx + 1}. ${m.name}：有属性加成\n`;
							}
							else if(m.name === '猛袭刻痕') 
							{
								text += `${idx + 1}. ${m.name}：武器威力+${m.count}${countText}\n`;
							}
							else if(m.name === '储备刻痕') 
							{
								text += `${idx + 1}. ${m.name}：若在战斗结束前使用了弹药，则可以无条件回收最多2个\n`;
							}
							else if(m.name === '变通刻痕') 
							{
								text += `${idx + 1}. ${m.name}：可挂钩属性增加\n`;
							}
							else 
							{
								text += `${idx + 1}. ${m.name}：${m.effect}${countText}\n`;
							}
						});
						seal.replyToSender(ctx, msg, text);
					}

                })
	return seal.ext.newCmdExecuteResult(true);
};
ext.cmdMap['随机武器'] = cmd5;

const cmd6 = seal.ext.newCmdItemInfo();
cmd6.name = 'c';
cmd6.help = '一个定时器，格式如下：\n.c 任务名称 持续时间\n示例：.c 微波炉 30\n效果为：30s后显示“任务<微波炉>倒计时已结束”\n注意：任务名称如果是“取消”，则会取消所有任务的倒计时';
cmd6.solve = (ctx, msg, cmdArgs) => {
	let thingName = cmdArgs.getArgN(1);
	let durationstr = cmdArgs.getArgN(2);
	// 检查是否是取消命令
    if (thingName === '取消') {
        cancelAllTimeouts(ctx, msg);
        return seal.ext.newCmdExecuteResult(true);
    }
	// 参数有效性检查
	if (!thingName || !durationstr) {
        seal.replyToSender(ctx, msg, "一个定时器，格式如下：\n.c 任务名称 持续时间\n示例：.c 微波炉 30\n效果为：30s后显示“任务<微波炉>倒计时已结束”\n注意：任务名称如果是“取消”，则会取消所有任务的倒计时");
        return seal.ext.newCmdExecuteResult(true);
    }
		
	// 转换数字类型参数
	const duration = parseInt(durationstr);
    if (isNaN(duration)|| duration <= 0) {
        seal.replyToSender(ctx, msg, "持续时间必须是大于0的数字，单位为秒");
        return seal.ext.newCmdExecuteResult(true);
    }

	// 发送确认消息
    seal.replyToSender(ctx, msg, `已设置“${thingName}”的${duration}秒倒计时`);

	// 创建相关联的定时器组
    const timeoutGroup = {
        main: null,
        halfway: null,
        tenSeconds: null,
        thingName: thingName,
        duration: duration
    };

	// 设置中途提醒定时器
        // 1. 过半提醒
        const halfwayTime = Math.floor(duration / 2);
        if (halfwayTime >= 1) { // 至少1秒才设置提醒
            timeoutGroup.halfway = setTimeout(() => {
                seal.replyToSender(ctx, msg, `${thingName} 倒计时已过半，剩余${halfwayTime}秒`);
                // 从活动定时器列表中移除已完成的中途提醒
                removeTimeout(timeoutGroup.halfway);
            }, halfwayTime * 1000);
            activeTimeouts.push(timeoutGroup.halfway);
        }
        
        // 2. 10秒提醒（仅当总时长超过10秒时）
        if (duration > 10) {
            const tenSecondsTime = duration - 10;
            timeoutGroup.tenSeconds = setTimeout(() => {
                seal.replyToSender(ctx, msg, `${thingName} 倒计时还剩10秒！`);
                // 从活动定时器列表中移除已完成的10秒提醒
                removeTimeout(timeoutGroup.tenSeconds);
            }, tenSecondsTime * 1000);
            activeTimeouts.push(timeoutGroup.tenSeconds);
        }
        
        // 设置主倒计时定时器
        timeoutGroup.main = setTimeout(() => {
            // 倒计时结束后发送提醒消息
            seal.replyToSender(ctx, msg, `${thingName} 倒计时完毕`);
            
            // 清理相关定时器引用
            removeTimeout(timeoutGroup.main);
            if (timeoutGroup.halfway) removeTimeout(timeoutGroup.halfway);
            if (timeoutGroup.tenSeconds) removeTimeout(timeoutGroup.tenSeconds);
        }, duration * 1000);
        
        // 将主定时器ID添加到活动列表
        activeTimeouts.push(timeoutGroup.main);
	
	return seal.ext.newCmdExecuteResult(true);
};
ext.cmdMap['c'] = cmd6;