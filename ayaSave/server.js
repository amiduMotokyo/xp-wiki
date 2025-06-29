// 新增生成升级记录的函数
function generateUpgradeRecords(weapon, uniqueUpgradeStats, uniqueUpgrades, upgradeStats) {
    weapon.升级记录 = [];
    
    // 处理独特升级记录
    uniqueUpgradeStats.forEach((count, upgradeId) => {
        const upgrade = uniqueUpgrades.find(u => u.upgrade_id === upgradeId);
        if (upgrade) {
            if (upgrade.effect.includes("属性增益上限+2")) {
                const upgradeDataArray = upgradeStats.get(100 + upgradeId) || [];
                const attrCounts = {};
                upgradeDataArray.forEach(data => {
                    attrCounts[data.attr] = (attrCounts[data.attr] || 0) + 2;
                });
                Object.entries(attrCounts).forEach(([attr, total]) => {
                    weapon.升级记录.push(`获得${attr}属性增益上限+${total}（${upgrade.cost_level * (total/2)}级）`);
                });
            } else {
                const totalCost = count * upgrade.cost_level;
                weapon.升级记录.push(`${upgrade.effect}（${count}×${upgrade.cost_level} = ${totalCost}级）`);
            }
        }
    });

    // 处理普通升级记录
    upgradeStats.forEach((value, key) => {
        switch(key) {
            case 0: 
                weapon.升级记录.push(`力量阈值-${value}（${value/5}级）`);
                break;
            case 1:
                weapon.升级记录.push(`武器威力+${value}（${value}级）`);
                break;
            case 2:
                weapon.升级记录.push(`射程+${value}（${value}级）`);
                break;
            case 3:
                weapon.升级记录.push(`施法范围+${value}（${value}级）`);
                break;
            case 4:
                weapon.升级记录.push(`激活施法能力（3级）`);
                break;
            case 5:
                const total = value.count;
                const desc = Object.entries(value.attributes)
                    .map(([attr, count]) => `${attr}+${count}`)
                    .join(', ');
                if (desc) {
                    weapon.升级记录.push(`属性强化：${desc}（${total}级）`);
                }
                break;
        }
    });
}
// 新增处理普通升级的独立函数
function handleUpgradeOption(option, weapon, upgradeStats, uniqueUpgradeStats, uniqueUpgrades, remainingLevels, skipCount) {
    switch(option) {
        case 0: {
            const oldValue = weapon.力量阈值;
            weapon.力量阈值 = Math.max(5, weapon.力量阈值 - 5);
            const delta = oldValue - weapon.力量阈值;
            if (delta > 0) {
                upgradeStats.set(0, (upgradeStats.get(0) || 0) + delta);
            }
            break;
        }
        case 1: {
            if (weapon.武器威力 < weapon.武器威力上限) {
                weapon.武器威力++;
                upgradeStats.set(1, (upgradeStats.get(1) || 0) + 1);
            }
            break;
        }
        case 2: {
            if (weapon.大类 === '远程武器' && weapon.攻击范围 < weapon.攻击范围上限) {
                weapon.攻击范围++;
                upgradeStats.set(2, (upgradeStats.get(2) || 0) + 1);
            }
            break;
        }
        case 3: {
            if (weapon.施法范围 > 1 && weapon.施法范围 < weapon.施法范围上限) {
                weapon.施法范围++;
                upgradeStats.set(3, (upgradeStats.get(3) || 0) + 1);
            }
            break;
        }
        case 4: {
            if (weapon.施法范围 === 1) {
                weapon.施法范围 = 2;
                skipCount.value = 2; // 通过对象传递来修改外部变量
                upgradeStats.set(4, 1);
            }
            break;
        }
        case 5: {
            if (weapon.是否有属性加成 === 1) {
                let points = 2;
                const allocRecords = {};
                const upgradeCount = 1;
                
                while (points > 0) {
                    const attributes = Object.keys(weapon.属性加成)
                        .filter(attr => weapon.属性加成[attr] < weapon.属性上限[attr]);
                    
                    if (attributes.length === 0) break;
                    
                    const selected = attributes[Math.floor(Math.random() * attributes.length)];
                    weapon.属性加成[selected]++;
                    allocRecords[selected] = (allocRecords[selected] || 0) + 1;
                    points--;
                }
                
                if (Object.keys(allocRecords).length > 0) {
                    if (upgradeStats.has(5)) {
                        const existing = upgradeStats.get(5);
                        existing.count += upgradeCount;
                        for (const [attr, count] of Object.entries(allocRecords)) {
                            existing.attributes[attr] = (existing.attributes[attr] || 0) + count;
                        }
                    } else {
                        upgradeStats.set(5, {
                            attributes: allocRecords,
                            count: upgradeCount
                        });
                    }
                }
            }
            break;
        }
        default:
            if (option >= 100) {
                const upgradeId = option - 100;
                const upgrade = uniqueUpgrades.find(u => u.upgrade_id === upgradeId);
                if (upgrade?.effect.includes("属性增益上限+2")) {
                    const availableAttrs = Object.keys(weapon.属性上限)
                        .filter(attr => weapon.属性加成[attr] >= weapon.属性上限[attr]);
                    
                    if (availableAttrs.length > 0) {
                        const selectedAttr = availableAttrs[Math.floor(Math.random() * availableAttrs.length)];
                        weapon.属性上限[selectedAttr] += 2;
                        const storageKey = 100 + upgradeId;
                        const existingData = upgradeStats.get(storageKey) || [];
                        existingData.push({
                            attr: selectedAttr,
                            cost: upgrade.cost_level
                        });
                        upgradeStats.set(storageKey, existingData);
                    } else {
                        return false; // 表示需要重新选择
                    }
                }
                if (upgrade) {
                    const currentCount = uniqueUpgradeStats.get(upgradeId) || 0;
                    uniqueUpgradeStats.set(upgradeId, currentCount + 1);

                    const existingUpgrade = weapon.独特升级.find(u => u.upgrade_id === upgradeId);
                    if (existingUpgrade) {
                        existingUpgrade.已使用次数 += 1;
                    } else {
                        weapon.独特升级.push({
                            upgrade_id: upgradeId,
                            效果: upgrade.effect,
                            已使用次数: 1
                        });
                    }
                    
                    skipCount.value = upgrade.cost_level - 1;
                    if(!upgrade.effect.includes("属性增益上限+2")) {
                        upgradeStats.set(100 + upgradeId, (upgradeStats.get(100 + upgradeId) || 0) + upgrade.cost_level);
                    }
                }
            }
            break;
    }
    return true;
}
// 新增处理刻痕的独立函数
function handleSelectedMoulage(selected, weapon, available) {
    // 处理特殊刻痕效果
    if (selected.name === '共鸣刻痕' && weapon.是否有属性加成 === 1) {
        const allocAttrs = [];
        for (let n = 0; n < 2; n++) {
            const attrs = Object.keys(weapon.属性加成);
            const selectedAttr = attrs[Math.floor(Math.random() * attrs.length)];
            allocAttrs.push(selectedAttr);
            weapon.属性加成[selectedAttr]++;
            weapon.属性上限[selectedAttr]++;
        }
        if (!weapon.共鸣属性) weapon.共鸣属性 = [];
        weapon.共鸣属性.push(...allocAttrs);
    } 
    else if (selected.name === '减重刻痕') {
        const oldValue = weapon.力量阈值;
        weapon.力量阈值 = Math.max(5, weapon.力量阈值 - 5);
        const delta = oldValue - weapon.力量阈值;
        if (delta > 0) {
            weapon.力量阈值减少量 = (weapon.力量阈值减少量 || 0) + delta;
        }
    }
    else if (selected.name === '扩容刻痕') {
        weapon.初始弹药量 = (weapon.初始弹药量 || 0) + 2;
    }
    else if (selected.name === '及远刻痕') {
        weapon.攻击范围上限++;
        weapon.攻击范围++;
    }
    else if (selected.name === '魔感刻痕') { // 新增效果处理
        weapon.施法范围上限++;
        weapon.施法范围++;
    }
    else if (selected.name === '特异刻痕') {
        // 不做处理
    }
    else if (selected.name === '奇崛刻痕') {
        // 不做处理
    }
    else if (selected.name === '省悟刻痕') {
        weapon.是否有属性加成 = 1;
        // 初始化属性加成和上限（如果不存在）
        if (!weapon.属性加成) {
            weapon.属性加成 = { 力量: 0, 敏捷: 0, 体质: 0, 智力: 0, 魅力: 0, 魔力: 0 };
        }
        if (!weapon.属性上限) {
            weapon.属性上限 = { 力量: 6, 敏捷: 6, 体质: 6, 智力: 6, 魅力: 6, 魔力: 6 };
        }
    }
    else if (selected.name === '猛袭刻痕') {
        weapon.武器威力上限++;
        weapon.武器威力++;
    }
    else if (selected.name === '储备刻痕') {
        // 添加特殊效果（确保不重复添加）
        const effectText = '该武器若在战斗结束前使用了弹药，则可以无条件回收最多2个';
        if (!weapon.特殊效果.includes(effectText)) {
            weapon.特殊效果 = weapon.特殊效果 
                ? `${weapon.特殊效果}\n${effectText}`
                : effectText;
        }
    }
    else if (selected.name === '变通刻痕') {
        // 拆分现有挂钩属性为数组
        const currentAttrs = weapon.挂钩属性.split('/').filter(attr => attr.trim() !== '');
        // 生成可选的属性列表（排除魔力和已存在的属性）
        const availableAttrs = Object.keys(weapon.属性加成)
            .filter(attr => 
                attr !== '魔力' && 
                !currentAttrs.includes(attr)
            );
        
        if (availableAttrs.length > 0) {
            const selectedAttr = availableAttrs[Math.floor(Math.random() * availableAttrs.length)];
            currentAttrs.push(selectedAttr);
            weapon.挂钩属性 = currentAttrs.join('/');
        } else {
            // 如果没有可用属性，保持原样
        }
    }
    // 查找是否已有相同可叠加印痕
    const existing = weapon.印痕.find(m => 
        m.moulage_id === selected.moulage_id && 
        selected.can_superpose === 1
    );
    
    if (existing) {
        existing.count = (existing.count || 1) + 1;
    } else {
        weapon.印痕.push({
            moulage_id: selected.moulage_id,
            name: selected.name,
            effect: selected.effect,
            scale: selected.scale,
            count: 1
        });
    }
}

// 升级函数
function upgradeWeapon(weapon, level, uniqueUpgrades, moulage)
{
    // 在初始化部分添加印痕存储
    if (!weapon.印痕) {
        weapon.印痕 = [];
    }
    // 定义质变等级规则
    const milestoneLevels = {
        5: { type: 0, count: 1 },  // 小印痕
        7: { type: 0, count: 1 },
        9: { type: 1, count: 1 },  // 大印痕
        11: { type: 1, count: 1 },
        13: { type: 0, count: 2 },
        15: { type: 1, count: 2 }
    };
    // 在初始化部分添加独特升级存储
    if (!weapon.独特升级) {
        weapon.独特升级 = [];
    }
    // 初始化属性加成
    if (!weapon.属性加成) {
        weapon.属性加成 = {
            力量: 0,
            敏捷: 0, 
            体质: 0,
            智力: 0,
            魅力: 0,
            魔力: 0
        };
    }
    // 在初始化部分添加属性上限
    if (!weapon.属性上限) {
        weapon.属性上限 = {
            力量: 6,
            敏捷: 6,
            体质: 6,
            智力: 6, 
            魅力: 6,
            魔力: 6
        };
    }
    // 保存初始值用于上限判断
    const initialPower = weapon.武器威力;
    if (!weapon.武器威力上限) {
        weapon.武器威力上限 = initialPower + 10;
    }
    if(weapon.大类 === '远程武器' && weapon.子类 !== '投掷（飞镖）')
    {
        weapon.攻击范围 = Number(weapon.攻击范围);
    }
    const initialRange = weapon.攻击范围;
    const initialMageRange = weapon.施法范围;
    if (!weapon.攻击范围上限) {
        weapon.攻击范围上限 = initialRange + 5;
    }
    if (!weapon.施法范围上限) {
        weapon.施法范围上限 = initialMageRange + 8;
    }
    // 初始化升级统计对象
    const upgradeStats = new Map();
    // 新增独特升级计数器
    const uniqueUpgradeStats = new Map();
    let skipCount = 0; // 新增跳过计数器
    for (let i = 1; i < level; i++) 
    {
        // -----------------以下处理印痕-----------------
        if (milestoneLevels[i+1]) {  // 检查当前等级是否质变等级
            const { type, count } = milestoneLevels[i+1];
            const available = moulage.filter(m => {
                // 基础过滤条件
                const baseCondition = m.scale === type && 
                    (m.can_superpose || !weapon.印痕.some(im => im.moulage_id === m.moulage_id));
                
                // 特殊印痕过滤
                if (m.name === '共鸣刻痕') {
                    return baseCondition && weapon.是否有属性加成 === 1;
                }
                if (m.name === '减重刻痕') {
                    return baseCondition && weapon.力量阈值 > 5;
                }
                if (m.name === '扩容刻痕') {
                    return baseCondition && 
                        (weapon.大类 === '远程武器' || (weapon.初始弹药量 || 0) > 0);
                }
                if (m.name === '及远刻痕') {
                    return baseCondition && weapon.大类 === '远程武器' && weapon.子类 !== '投掷（飞镖）';
                }
                if (m.name === '魔感刻痕') {
                    return baseCondition && weapon.施法范围 > 1;
                }
                if (m.name === '特异刻痕') {
                    return baseCondition; // 无需额外条件
                }
                if (m.name === '奇崛刻痕') {
                    return baseCondition; // 无需额外条件
                }
                if (m.name === '省悟刻痕') {
                    return baseCondition && weapon.是否有属性加成 !== 1;
                }
                if (m.name === '猛袭刻痕') {
                    return baseCondition; // 无需额外条件
                }
                if (m.name === '储备刻痕') {
                    return baseCondition && 
                        (weapon.大类 === '远程武器' || (weapon.初始弹药量 || 0) > 0);
                }
                if (m.name === '变通刻痕') {
                    return baseCondition; // 无需额外条件
                }
                return baseCondition;
            });
            
            for (let j = 0; j < count && available.length > 0; j++) {
                const selected = available[Math.floor(Math.random() * available.length)];
                handleSelectedMoulage(selected, weapon, available);
                // 不可叠加的印痕需要从备选池移除
                if (!selected.can_superpose) {
                    available.splice(available.indexOf(selected), 1);
                }
            }
        }
        // -----------------以下处理普通升级逻辑-----------------
        // 新增剩余等级计算
        const remainingLevels = level - i + 1; // +1 包含当前等级
        // 检查是否需要跳过
        if (skipCount > 0) {
            skipCount--;
            continue;
        }
        // 生成可用选项列表
        const availableOptions = [];
        
        // 检查各强化方向是否可用
        if (weapon.力量阈值 > 5) availableOptions.push(0);    // 力量阈值还能降低
        if (weapon.武器威力 < weapon.武器威力上限) availableOptions.push(1); // 威力还能提升
        if (weapon.大类 === '远程武器' && weapon.攻击范围 < weapon.攻击范围上限 && weapon.子类 !== '投掷（飞镖）') availableOptions.push(2);
        if (weapon.施法范围 > 1 && weapon.施法范围 < weapon.施法范围上限) availableOptions.push(3);
        if (initialMageRange === 1 && weapon.施法范围 === 1 && remainingLevels >= 3) {
            availableOptions.push(4);
        }
        if (weapon.是否有属性加成 === 1) {
            availableOptions.push(5);
        }

        // 生成可用选项列表时添加独特选项
        uniqueUpgrades.forEach(upgrade => {
            const usedTimes = uniqueUpgradeStats.get(upgrade.upgrade_id) || 0;
            const hasEnoughLevels = (remainingLevels + (weapon.额外等级 || 0)) >= upgrade.cost_level;
            // 新增：对属性增益上限升级的特殊处理
            if (upgrade.effect.includes("属性增益上限+2")) {
                // 检查是否存在已达上限的属性
                const hasMaxAttributes = Object.keys(weapon.属性上限).some(attr => 
                    weapon.属性加成[attr] >= weapon.属性上限[attr]
                );
                if (hasMaxAttributes && usedTimes < upgrade.upper_limit && hasEnoughLevels) {
                    availableOptions.push(100 + upgrade.upgrade_id);
                }
            }
            else if (usedTimes < upgrade.upper_limit && hasEnoughLevels) 
            {
                availableOptions.push(100 + upgrade.upgrade_id);
            }
        });

        // 如果没有可用选项则跳过本次升级
        if (availableOptions.length === 0) continue;
        
        // 从可用选项中随机选择
        const option = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        
        // 使用对象包装skipCount以实现引用传递
        const skipObj = { value: skipCount };
        let handled = false;
        do {
            handled = handleUpgradeOption(option, weapon, upgradeStats, uniqueUpgradeStats, 
                uniqueUpgrades, remainingLevels, skipObj);
            if (!handled) continue; // 当独特升级条件不满足时重新选择
        } while (!handled);
        skipCount = skipObj.value;
    }

    

    // 生成合并后的升级记录
    generateUpgradeRecords(weapon, uniqueUpgradeStats, uniqueUpgrades, upgradeStats);
}



// 1. 加载需要的工具
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose(); 
const db = new sqlite3.Database('C:/Users/Administrator/Desktop/sealdice-core_1.3.0_windows_amd64/data/default/extensions/xp/databases/weapons.db');
// 2. 创建服务器
const app = express();
app.use(cors()); // 允许跨域访问

// 3. 设置处理请求的规则
app.get('/weapon', (req, res) => {
  // 从请求中获取关键词
  const { mode: numMode, name: encodedName, level: numLevel } = req.query;

  // 参数校验
  if (!numMode || !encodedName || !numLevel) {
    return res.status(400).json({ 
      error: "缺少必要参数，格式应为：/weapon?mode=模式&name=名称&level=等级" 
    });
  }
  // 解码URL编码的参数（示例解码名称）
  const decodedName = decodeURIComponent(encodedName);
  let sql = '';
  if(numMode == 0)//全随机模式
  {
    sql = `
    SELECT 
        c.category_name AS 大类,
        s.subcategory_name AS 子类,
        v.variant_name AS 变体,
        v.linked_attribute AS 挂钩属性,
        v.strength_threshold AS 力量阈值,
        v.weapon_range AS 攻击范围,
        v.weapon_power AS 武器威力,
        v.magic_range AS 施法范围,
	      v.can_attribute AS 是否有属性加成,
	      v.Ammo AS 初始弹药量,
        COALESCE(GROUP_CONCAT(e.effect, CHAR(10)), '无特效') AS 特殊效果
    FROM weapon_variants v
    JOIN weapon_subcategories s ON v.subcategory_id = s.subcategory_id
    JOIN weapon_categories c ON s.category_id = c.category_id
    LEFT JOIN special_effects e ON v.variant_id = e.variant_id
    GROUP BY v.variant_id
    ORDER BY RANDOM()  -- 新增随机排序
    LIMIT 1;           -- 明确限制获取一条
    `;
    
  }
  else if(numMode == 1)//按大类随机
  {
    sql = `
    SELECT 
        c.category_name AS 大类,
        s.subcategory_name AS 子类,
        v.variant_name AS 变体,
        v.linked_attribute AS 挂钩属性,
        v.strength_threshold AS 力量阈值,
        v.weapon_range AS 攻击范围,
        v.weapon_power AS 武器威力,
        v.magic_range AS 施法范围,
	      v.can_attribute AS 是否有属性加成,
	      v.Ammo AS 初始弹药量,
        COALESCE(GROUP_CONCAT(e.effect, CHAR(10)), '无特效') AS 特殊效果
    FROM weapon_variants v
    JOIN weapon_subcategories s ON v.subcategory_id = s.subcategory_id
    JOIN weapon_categories c ON s.category_id = c.category_id
    LEFT JOIN special_effects e ON v.variant_id = e.variant_id
    WHERE c.category_name = '${decodedName}'  -- 按解码后的大类名称过滤
    GROUP BY v.variant_id
    ORDER BY RANDOM()  -- 新增随机排序
    LIMIT 1;           -- 明确限制获取一条
    `;
  }
  else if(numMode == 2)//按子类随机
  {
    sql = `
    SELECT 
        c.category_name AS 大类,
        s.subcategory_name AS 子类,
        v.variant_name AS 变体,
        v.linked_attribute AS 挂钩属性,
        v.strength_threshold AS 力量阈值,
        v.weapon_range AS 攻击范围,
        v.weapon_power AS 武器威力,
        v.magic_range AS 施法范围,
	      v.can_attribute AS 是否有属性加成,
	      v.Ammo AS 初始弹药量,
        COALESCE(GROUP_CONCAT(e.effect, CHAR(10)), '无特效') AS 特殊效果
    FROM weapon_variants v
    JOIN weapon_subcategories s ON v.subcategory_id = s.subcategory_id
    JOIN weapon_categories c ON s.category_id = c.category_id
    LEFT JOIN special_effects e ON v.variant_id = e.variant_id
    WHERE s.subcategory_name = '${decodedName}'  
    GROUP BY v.variant_id
    ORDER BY RANDOM()  -- 新增随机排序
    LIMIT 1;           -- 明确限制获取一条
    `;
  }
  else if(numMode == 3)//按子类随机
  {
    sql = `
    SELECT 
        c.category_name AS 大类,
        s.subcategory_name AS 子类,
        v.variant_name AS 变体,
        v.linked_attribute AS 挂钩属性,
        v.strength_threshold AS 力量阈值,
        v.weapon_range AS 攻击范围,
        v.weapon_power AS 武器威力,
        v.magic_range AS 施法范围,
	      v.can_attribute AS 是否有属性加成,
	      v.Ammo AS 初始弹药量,
        COALESCE(GROUP_CONCAT(e.effect, CHAR(10)), '无特效') AS 特殊效果
    FROM weapon_variants v
    JOIN weapon_subcategories s ON v.subcategory_id = s.subcategory_id
    JOIN weapon_categories c ON s.category_id = c.category_id
    LEFT JOIN special_effects e ON v.variant_id = e.variant_id
    WHERE v.variant_name = '${decodedName}'  
    GROUP BY v.variant_id
    ORDER BY RANDOM()  -- 新增随机排序
    LIMIT 1;           -- 明确限制获取一条
    `;
  }
  db.all(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ 
        success: false,
        error: "数据库查询失败: " + err.message 
      });
    }

    if (results.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: "未找到匹配的武器信息" 
      });
    }

    db.all(`
      SELECT * FROM unique_upgrade 
        WHERE subcategories_id = (SELECT subcategory_id FROM weapon_subcategories WHERE subcategory_name = '${results[0].子类}')
        AND (variants_id IS NULL OR variants_id = (SELECT variant_id FROM weapon_variants WHERE variant_name = '${results[0].变体}'));
    `, (err, uniqueUpgrades) => {

        db.all(`
        SELECT * FROM moulage;
        `, (err, moulage) => {
            upgradeWeapon(results[0], parseInt(numLevel), uniqueUpgrades || [], moulage || []);
            return res.json({
                success: true,
                mode: parseInt(numMode),
                name: decodedName,
                level: parseInt(numLevel),
                weaponInfo: results[0],  
                upgradeLog: results[0].升级记录 || [],  
                moulage: results[0].印痕 || [],
                message: "已成功收到你发送的关键词！"
            });
        });
    });
  });
  

  
});

// 4. 启动服务器（监听3000端口）
app.listen(3000, () => {
  console.log('服务已启动！访问地址：http://localhost:3000');
});