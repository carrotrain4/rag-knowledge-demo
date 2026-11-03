(() => {
  "use strict";

  const DOCS = {
    sop: {
      title: "装配工艺规范_SOP-A12",
      type: "DOCX",
      meta: "186 chunks · rev.3 · 48 页",
      excerpt: "M10 关键紧固点最终扭矩标准更新为 22 ± 1.5 N·m，首次拧紧与复紧分别记录；变更自 2026-08-12 起执行。",
      sample: "装配工艺规范 §4.2.1 关键紧固点扭矩控制：工位 A-12 的 M10 关键紧固点采用扭矩 + 角度法控制，最终扭矩标准为 22 ± 1.5 N·m。操作员需在 QMS 中分别记录首次拧紧与复紧结果。"
    },
    manual: {
      title: "设备维修手册_v4.2",
      type: "PDF",
      meta: "312 chunks · 248 页 · v4.2",
      excerpt: "主轴前端异响应优先检查轴承润滑状态与预紧力。复测油路压力应位于 2.8–3.2 bar，重新预紧使用 18 N·m 扭矩。",
      sample: "主轴单元维护 §7.3：出现周期性异响时，停机并等待主轴温度低于 40°C。检查油路压力、轴承润滑与预紧状态。重新预紧后空载运行 30 分钟并复测振动 RMS。"
    },
    orders: {
      title: "故障工单_2026Q3",
      type: "XLSX",
      meta: "86 chunks · 86 条工单",
      excerpt: "同型号 CNC 设备 4 例主轴异响中，3 例由轴承润滑不足或预紧力漂移导致，平均修复时长 2.4 h。",
      sample: "工单 WO-2026-0831：CNC-07 主轴周期性异响，振动 RMS 4.6 mm/s。更换 6207-2RS 轴承并重新预紧，修复后振动恢复至 2.1 mm/s。"
    },
    change: {
      title: "工艺变更通知_CN-2026-08",
      type: "PDF",
      meta: "24 chunks · 6 页",
      excerpt: "新版扭矩配方生效后，需在 24 小时内完成扭矩枪校准并更新工位配方；未完成校准的设备不得投入生产。",
      sample: "变更范围：A-12 / A-13 工位 M10 紧固点。生效日期：2026-08-12。执行要求：完成扭矩枪双点校准、工位配方更新与首件确认。"
    },
    plan: {
      title: "设备维保计划_Q4",
      type: "PPTX",
      meta: "64 chunks · 28 页",
      excerpt: "主轴单元建议每 500 h 执行一次点检，当前累计运行 487 h。计划检修标准工时为 3.2 h。",
      sample: "Line 2 主轴单元预防性维保计划：建议每 500 运行小时进行润滑与预紧点检，推荐在低负荷窗口合并执行。"
    },
    mail: {
      title: "供应商变更邮件归档",
      type: "EML",
      meta: "54 chunks · 近期邮件",
      excerpt: "邮件主要涉及包装材料与二级供应商信息同步，未包含海外供应商切换的完整合规审批流程。",
      sample: "主题：供应商信息同步。正文：本批次包装材料供应商变更已完成采购登记，质量协议待补充。该邮件不涉及新供应商准入审批。"
    },
    image: {
      title: "CNC-07 维修示意图",
      type: "PNG",
      meta: "18 chunks · 图片 OCR",
      excerpt: "示意图标注主轴前端轴承位置、润滑油路压力检测点与预紧螺母位置。",
      sample: "图像 OCR 与视觉标注：主轴前端轴承位于主轴箱前侧，润滑油路压力检测点位于箱体左下；预紧螺母需要专用工装。"
    }
  };

  const ANSWERS = {
    torque: {
      key: "torque",
      prompt: "A-12 工位最新的扭矩标准是多少？变更后需要做哪些确认？",
      intent: "装配工艺 / 标准查询",
      rewritten: "A-12 关键紧固点 最新扭矩标准 变更后确认事项 校准确认",
      confidence: 0.94,
      title: "A-12 最新扭矩标准为 22 ± 1.5 N·m",
      answer: "自 2026-08-12 起，A-12 工位 M10 关键紧固点的最终扭矩标准已由 20 N·m 更新为 22 ± 1.5 N·m。新版配方生效后，必须在 24 小时内完成扭矩枪校准并更新工位配方。",
      facts: [
        { label: "最新标准", value: "22 ± 1.5 N·m" },
        { label: "生效日期", value: "2026-08-12" },
        { label: "必做确认", value: "24h 内校准" }
      ],
      steps: [
        "将 A-12 工位配方从旧版 20 N·m 更新为 22 ± 1.5 N·m，并锁定配方修改权限。",
        "使用标准扭矩仪完成扭矩枪双点校准，保留校准记录并关联设备编号。",
        "完成首件确认与连续 10 件抽检，全部落在 20.5–23.5 N·m 内后方可恢复批量生产。"
      ],
      chunks: [
        {
          title: "A-12 关键紧固点扭矩标准（rev.3）",
          source: "装配工艺规范_SOP-A12",
          meta: "DOCX · P.14 · rev.3 · hybrid 0.81 / rerank 0.96",
          score: 0.96,
          snippetHtml: "M10 关键紧固点最终扭矩标准更新为 <mark>22 ± 1.5 N·m</mark>，首次拧紧与复紧分别记录；本变更自 2026-08-12 起执行。旧版 20 N·m 配方同时失效。",
          parent: "装配工艺规范 §4.2.1 关键紧固点扭矩控制：A-12 工位采用扭矩 + 角度法控制。最终扭矩标准为 22 ± 1.5 N·m，首次拧紧与复紧需分别记录，整批产品应满足 Cpk ≥ 1.33 的过程能力要求。"
        },
        {
          title: "工艺变更通知 CN-2026-08",
          source: "工艺变更通知_CN-2026-08",
          meta: "PDF · P.2 · 2026-08-08 发布 · hybrid 0.76 / rerank 0.93",
          score: 0.93,
          snippetHtml: "新版扭矩配方生效后，需在 <mark>24 小时内完成扭矩枪校准</mark>并更新工位配方；未完成校准的设备不得投入生产。",
          parent: "变更范围：A-12 / A-13 工位 M10 紧固点。生效日期：2026-08-12。执行要求：扭矩枪双点校准、工位配方更新、首件确认与过程能力复核。质量部门负责留存完整变更记录。"
        },
        {
          title: "A-12 近 7 日扭矩抽检摘要",
          source: "QMS · 扭矩抽检数据",
          meta: "SQL / QMS · 120 条 · hybrid 0.71 / rerank 0.88",
          score: 0.88,
          snippetHtml: "抽检 120 条中 <mark>14 条低于 20.5 N·m</mark>，均值 21.4 N·m、标准差 0.9；低值集中在 10 月 22 日换班后。",
          parent: "A-12 工位近 7 日扭矩抽检记录共 120 条，达标率 88.3%。低于下限的记录主要发生在 10 月 22 日换班后，建议结合校准记录与工位配方版本执行批次追溯。"
        }
      ],
      citations: [
        { ref: "SOP-A12 rev.3 · P.14", index: 0 },
        { ref: "变更通知 CN-2026-08", index: 1 },
        { ref: "QMS 抽检 120 条", index: 2 }
      ],
      ragas: { faithfulness: 0.95, answerRelevancy: 0.93, contextRelevancy: 0.91 },
      latencyMs: 1260,
      tokens: 1842,
      fallback: false
    },

    maintenance: {
      key: "maintenance",
      prompt: "CNC-07 主轴异响应该如何排查？验收阈值是多少？",
      intent: "设备维修 / 故障排查",
      rewritten: "CNC-07 主轴 周期性异响 排查步骤 轴承预紧 振动验收阈值",
      confidence: 0.93,
      title: "优先检查主轴前端轴承润滑与预紧状态",
      answer: "维修手册和同类故障工单均指向主轴前端轴承润滑不足或预紧力漂移。建议安全停机后检查油路压力、重新预紧轴承，并以振动 RMS ≤ 2.8 mm/s 作为复机验收阈值。",
      facts: [
        { label: "首要原因", value: "轴承预紧漂移" },
        { label: "预紧扭矩", value: "18 N·m" },
        { label: "验收阈值", value: "RMS ≤ 2.8 mm/s" }
      ],
      steps: [
        "降速停机并挂牌上锁，待主轴温度低于 40°C 后再进入检查。",
        "复测油路压力（目标 2.8–3.2 bar），按手册 §7.3 将轴承预紧扭矩恢复至 18 N·m。",
        "更换或复用 6207-2RS 轴承后空载运行 30 分钟，复测振动 RMS 与主轴温升。",
        "若振动仍高于 2.8 mm/s 或温升超过 8°C，升级设备厂家远程诊断。"
      ],
      chunks: [
        {
          title: "主轴轴承预紧与润滑检查",
          source: "设备维修手册_v4.2",
          meta: "PDF · P.87 · §7.3 · hybrid 0.79 / rerank 0.94",
          score: 0.94,
          snippetHtml: "主轴前端异响应优先检查轴承润滑状态与预紧力。复测油路压力应位于 <mark>2.8–3.2 bar</mark>，重新预紧时使用 <mark>18 N·m</mark> 扭矩。",
          parent: "主轴前端异响应优先检查轴承润滑状态与预紧力。停机并等待主轴温度低于 40°C 后，复测油路压力。重新预紧后空载运行 30 分钟并复测振动 RMS；验收阈值建议不高于 2.8 mm/s。"
        },
        {
          title: "CNC 系列同类故障工单",
          source: "故障工单_2026Q3",
          meta: "XLSX · WO-2026-0831 · hybrid 0.68 / rerank 0.9",
          score: 0.90,
          snippetHtml: "同型号设备 4 例主轴异响中，<mark>3 例由轴承润滑不足或预紧力漂移导致</mark>，平均修复时长 2.4 h。",
          parent: "近 90 天同型号 CNC 设备共记录 4 例主轴周期性异响。其中 3 例更换轴承并重新预紧后恢复，1 例为刀具动平衡异常。振动 RMS 大于 4.2 mm/s 时应安排停机检查。"
        },
        {
          title: "CNC-07 维修示意图",
          source: "CNC-07 维修示意图",
          meta: "PNG · OCR / 视觉标注 · hybrid 0.62 / rerank 0.84",
          score: 0.84,
          snippetHtml: "示意图标注主轴前端轴承位置、润滑油路压力检测点与预紧螺母位置，需要使用专用工装。",
          parent: "图像 OCR 与视觉标注：主轴前端轴承位于主轴箱前侧，润滑油路压力检测点位于箱体左下；预紧螺母需要专用工装。操作前需完成能量隔离。"
        }
      ],
      citations: [
        { ref: "维修手册 §7.3 · P.87", index: 0 },
        { ref: "故障工单 WO-2026-0831", index: 1 },
        { ref: "CNC-07 维修示意图", index: 2 }
      ],
      ragas: { faithfulness: 0.94, answerRelevancy: 0.92, contextRelevancy: 0.9 },
      latencyMs: 1380,
      tokens: 2156,
      fallback: false
    },

    downtime: {
      key: "downtime",
      prompt: "Line 2 近 7 天停机损失最高的原因是什么？",
      intent: "产线运营 / 停机分析",
      rewritten: "Line 2 近 7 天 停机损失 原因占比 换型超时 最优检修窗口",
      confidence: 0.95,
      title: "换型超时是 Line 2 停机损失的首要原因",
      answer: "近 7 天 Line 2 累计停机 6.8 h，直接损失约 ¥184,600。换型超时贡献 42%，高于设备故障与物料等待。建议将主轴点检与换型优化合并到周六 02:00–05:00 的低负荷窗口。",
      facts: [
        { label: "累计停机", value: "6.8 h" },
        { label: "直接损失", value: "¥184,600" },
        { label: "首要原因", value: "换型超时 42%" }
      ],
      steps: [
        "对换型动作做时间拆解，把物料前置准备与工装确认提前到停机前完成。",
        "将 500 h 主轴点检与换型优化合并至周六 02:00–05:00 的低负荷窗口。",
        "检修前 4 h 确认备件、工装与作业票，目标恢复时间为 3.2 h。",
        "下一周复盘停机时长与产量影响，验收目标为停机损失下降至少 30%。"
      ],
      chunks: [
        {
          title: "Line 2 近 7 日停机事件汇总",
          source: "MES · 停机事件表",
          meta: "SQL · 23 条事件 · hybrid 0.77 / rerank 0.95",
          score: 0.95,
          snippetHtml: "近 7 日累计停机 <mark>6.8 h</mark>，其中换型超时 2.86 h、设备故障 2.12 h、物料等待 1.82 h；损失约 <mark>¥184,600</mark>。",
          parent: "Line 2 近 7 日停机事件共 23 条。按原因聚合：换型超时 2.86 h（42%）、设备故障 2.12 h（31%）、物料等待 1.82 h（27%）。按单位产能价值估算直接损失约 ¥184,600。"
        },
        {
          title: "主轴单元预防性维保计划",
          source: "设备维保计划_Q4",
          meta: "PPTX · PM-2026-Q4 · hybrid 0.7 / rerank 0.91",
          score: 0.91,
          snippetHtml: "主轴单元建议每 <mark>500 h</mark> 点检一次，当前累计运行 487 h；计划检修标准工时为 3.2 h。",
          parent: "Line 2 主轴单元建议每 500 运行小时进行润滑与预紧点检。当前累计运行 487 h，已进入计划检修窗口。标准工时为 3.2 h，可与换型优化合并执行。"
        },
        {
          title: "未来 14 天分时负荷预测",
          source: "APS · 产能快照",
          meta: "SQL / APS · 未来 14 天 · hybrid 0.65 / rerank 0.86",
          score: 0.86,
          snippetHtml: "周六 02:00–05:00 为未来 7 天最低负荷窗口，预计产量影响 <mark>180 件</mark>；工作日白班影响约 612 件。",
          parent: "APS 负荷预测显示，未来 7 天周六 02:00–05:00 为最低负荷窗口。将计划检修安排在该时段，预计影响产量 180 件；若安排在工作日白班，影响产量约 612 件。"
        }
      ],
      citations: [
        { ref: "MES 近 7 日停机事件", index: 0 },
        { ref: "设备维保计划_Q4", index: 1 },
        { ref: "APS 负荷预测", index: 2 }
      ],
      ragas: { faithfulness: 0.96, answerRelevancy: 0.94, contextRelevancy: 0.92 },
      latencyMs: 1150,
      tokens: 1624,
      fallback: false
    }
  };

  const state = {
    running: false,
    guardEnabled: true,
    autoTimer: null,
    lastAnswer: null,
    lastQuery: "",
    uploadedDocs: {},
    toastTimer: null,
    modalReturnFocus: null
  };

  const el = {
    chatMessages: document.getElementById("chatMessages"),
    qaForm: document.getElementById("qaForm"),
    questionInput: document.getElementById("questionInput"),
    sendButton: document.getElementById("sendButton"),
    promptChips: Array.from(document.querySelectorAll("#promptChips button")),
    docSearch: document.getElementById("docSearch"),
    docItems: Array.from(document.querySelectorAll(".doc-item")),
    docList: document.getElementById("docList"),
    sourceCount: document.getElementById("sourceCount"),
    uploadButton: document.getElementById("uploadButton"),
    fileUpload: document.getElementById("fileUpload"),
    guardToggle: document.getElementById("guardToggle"),
    clearChat: document.getElementById("clearChat"),
    traceSummary: document.getElementById("traceSummary"),
    traceLatency: document.getElementById("traceLatency"),
    evidenceArea: document.getElementById("evidenceArea"),
    fallbackStage: document.getElementById("fallbackStage"),
    ragasOverall: document.getElementById("ragasOverall"),
    faithfulnessValue: document.getElementById("faithfulnessValue"),
    answerRelevancyValue: document.getElementById("answerRelevancyValue"),
    contextRelevancyValue: document.getElementById("contextRelevancyValue"),
    faithfulnessBar: document.getElementById("faithfulnessBar"),
    answerRelevancyBar: document.getElementById("answerRelevancyBar"),
    contextRelevancyBar: document.getElementById("contextRelevancyBar"),
    ragasStatus: document.getElementById("ragasStatus"),
    toast: document.getElementById("toast"),
    evidenceModal: document.getElementById("evidenceModal"),
    modalClose: document.getElementById("modalClose"),
    modalKicker: document.getElementById("modalKicker"),
    modalTitle: document.getElementById("modalTitle"),
    modalMeta: document.getElementById("modalMeta"),
    modalQuote: document.getElementById("modalQuote"),
    modalScoreLabel: document.getElementById("modalScoreLabel"),
    modalScoreBar: document.getElementById("modalScoreBar"),
    modalScore: document.getElementById("modalScore")
  };

  const WELCOME_MARKUP = el.chatMessages.innerHTML;

  const DEFAULT_STAGES = {
    understand: { detail: "等待提问", state: "待命" },
    hybrid: { detail: "BM25 + Vector", state: "待命" },
    rerank: { detail: "CrossEncoder 二次打分", state: "待命" },
    generate: { detail: "证据约束生成", state: "待命" },
    evaluate: { detail: "三维质量检测", state: "待命" }
  };

  const TRACE_ICON = `<span class="summary-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 6h16M7 12h10M10 18h4"/></svg></span>`;
  const TRACE_PLACEHOLDER = `
    <div class="trace-placeholder">
      <span class="placeholder-mark">↗</span>
      <strong>检索证据</strong>
      <p>提问后展示 Top-3 语义块、父块上下文与重排得分。</p>
    </div>
  `;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function escapeHTML(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function stripHTML(value) {
    const temp = document.createElement("div");
    temp.innerHTML = value;
    return temp.textContent || temp.innerText || "";
  }

  function showToast(message) {
    if (state.toastTimer) window.clearTimeout(state.toastTimer);
    el.toast.textContent = message;
    el.toast.classList.add("show");
    state.toastTimer = window.setTimeout(() => {
      el.toast.classList.remove("show");
      state.toastTimer = null;
    }, 2500);
  }

  function scrollChatToBottom() {
    window.setTimeout(() => {
      el.chatMessages.scrollTop = el.chatMessages.scrollHeight;
    }, 50);
  }

  function cancelAutoRun() {
    if (state.autoTimer) {
      window.clearTimeout(state.autoTimer);
      state.autoTimer = null;
    }
  }

  function setBusy(busy) {
    state.running = busy;
    el.sendButton.disabled = busy;
    el.promptChips.forEach((button) => { button.disabled = busy; });
    el.sendButton.querySelector("span").textContent = busy ? "检索中" : "发送";
    if (busy) {
      el.guardToggle.disabled = true;
      el.clearChat.disabled = true;
    } else {
      el.guardToggle.disabled = false;
      el.clearChat.disabled = false;
    }
  }

  function setTraceSummary(mode, title, detail) {
    el.traceSummary.className = `trace-summary ${mode || ""}`.trim();
    el.traceSummary.innerHTML = `${TRACE_ICON}<div><strong>${escapeHTML(title)}</strong><small>${escapeHTML(detail)}</small></div>`;
  }

  function setStage(stageKey, mode, detail, stateText) {
    const row = document.querySelector(`.pipeline-row[data-stage="${stageKey}"]`);
    if (!row) return;
    row.classList.remove("running", "done");
    if (mode) row.classList.add(mode);
    const small = row.querySelector("small");
    const stateEl = row.querySelector(".stage-state");
    if (detail) small.textContent = detail;
    if (stateText !== undefined) stateEl.textContent = stateText;
  }

  function resetFallbackStage() {
    el.fallbackStage.hidden = true;
    el.fallbackStage.classList.remove("running", "done", "fallback");
    el.fallbackStage.querySelector("small").textContent = "联网检索 + 问题回流";
    el.fallbackStage.querySelector(".stage-state").textContent = "待命";
  }

  function resetRagas() {
    el.ragasOverall.textContent = "—";
    el.faithfulnessValue.textContent = "—";
    el.answerRelevancyValue.textContent = "—";
    el.contextRelevancyValue.textContent = "—";
    [el.faithfulnessBar, el.answerRelevancyBar, el.contextRelevancyBar].forEach((bar) => {
      bar.style.width = "0%";
      bar.parentElement.classList.remove("orange");
    });
    el.ragasStatus.className = "ragas-status";
    el.ragasStatus.innerHTML = "<i></i><span>等待检索结果</span>";
  }

  function resetTrace() {
    setTraceSummary("", "等待提问", "检索路径将在此实时更新");
    el.traceLatency.textContent = "— ms";
    Object.entries(DEFAULT_STAGES).forEach(([key, value]) => {
      setStage(key, "", value.detail, value.state);
    });
    resetFallbackStage();
    el.evidenceArea.innerHTML = TRACE_PLACEHOLDER;
    resetRagas();
  }

  function resolveAnswer(query, forcedKey) {
    const key = forcedKey || (() => {
      if (/(扭矩|a-12|装配|工艺规范|校准|sop)/i.test(query)) return "torque";
      if (/(主轴|cnc|异响|振动|维修|轴承)/i.test(query)) return "maintenance";
      if (/(停机|line\s*2|损失|换型|产能|检修)/i.test(query)) return "downtime";
      return "unknown";
    })();

    if (ANSWERS[key]) return ANSWERS[key];

    const shortQuery = query.length > 34 ? `${query.slice(0, 34)}…` : query;
    return {
      key: "unknown",
      prompt: query,
      intent: "知识覆盖不足 / 兜底检索",
      rewritten: `${query} 内部流程 供应商准入 合规审批`,
      confidence: 0.58,
      title: "内部知识证据不足，已触发兜底检索",
      answer: `当前知识库中未找到与「${shortQuery}」直接相关的完整内部依据。基于联网检索的公开资料，供应商切换通常涉及采购、质量、合规与信息安全多方评审，但具体审批节点需要以企业正式制度为准。`,
      facts: [
        { label: "内部置信度", value: "0.58" },
        { label: "证据覆盖", value: "不足" },
        { label: "兜底动作", value: "联网 + 回流" }
      ],
      steps: [
        "发起采购变更申请，补充新供应商资质、质量体系与交付能力证明材料。",
        "由质量、采购、合规与信息安全团队执行联合会签，识别物料与数据风险。",
        "完成小批量验证与首件确认后再切换，并将正式审批制度补充进知识库。"
      ],
      chunks: [
        {
          title: "供应商准入与变更管理（公开资料）",
          source: "Web Search · 外部资料",
          meta: "外部网页 · 无内部制度依据 · rerank 0.62",
          score: 0.62,
          snippetHtml: "一般制造企业会采用<mark>采购、质量、合规联合评审</mark>机制，但具体审批节点与表单不在公开资料中。",
          parent: "外部检索结果摘要：供应商切换通常包括资质审查、质量体系评估、小批量验证与变更审批。该结果只能作为通用流程参考，不能替代企业内部制度。"
        },
        {
          title: "供应商变更邮件归档（弱相关）",
          source: "供应商变更邮件归档",
          meta: "EML · 2026-09 · rerank 0.48",
          score: 0.48,
          snippetHtml: "邮件仅涉及包装材料与二级供应商信息同步，<mark>未包含海外供应商切换的完整审批流程</mark>。",
          parent: "主题：供应商信息同步。正文：本批次包装材料供应商变更已完成采购登记，质量协议待补充。该邮件不涉及新供应商准入审批，也未包含海外供应商合规评估要求。"
        }
      ],
      citations: [
        { ref: "Web Search · 外部资料", index: 0 },
        { ref: "供应商变更邮件归档", index: 1 }
      ],
      ragas: { faithfulness: 0.62, answerRelevancy: 0.74, contextRelevancy: 0.51 },
      latencyMs: 1840,
      tokens: 1268,
      fallback: true
    };
  }

  function appendUserMessage(text) {
    const wrapper = document.createElement("div");
    wrapper.className = "message user";
    wrapper.innerHTML = `
      <span class="message-avatar">YOU</span>
      <div class="message-main">
        <div class="message-meta"><strong>你</strong><span>刚刚</span></div>
        <div class="message-bubble"><p>${escapeHTML(text)}</p></div>
      </div>
    `;
    el.chatMessages.appendChild(wrapper);
    scrollChatToBottom();
  }

  function appendTypingMessage() {
    const wrapper = document.createElement("div");
    wrapper.className = "message assistant";
    wrapper.id = "typingMessage";
    wrapper.innerHTML = `
      <span class="message-avatar">AI</span>
      <div class="message-main">
        <div class="message-meta"><strong>制造知识助手</strong><span>正在检索</span><em>RAG</em></div>
        <div class="typing-bubble"><span class="typing-dots"><i></i><i></i><i></i></span><span>正在理解问题并检索证据…</span></div>
      </div>
    `;
    el.chatMessages.appendChild(wrapper);
    scrollChatToBottom();
    return wrapper;
  }

  function renderEvidence(answer) {
    const cards = answer.chunks.map((chunk, index) => {
      const targetId = `parent-context-${index}`;
      const scoreClass = chunk.score < 0.7 ? "low" : "";
      return `
        <article class="evidence-card">
          <div class="evidence-top">
            <span class="rank-badge">${String(index + 1).padStart(2, "0")}</span>
            <span class="evidence-title">${escapeHTML(chunk.title)}</span>
            <span class="evidence-score ${scoreClass}">${chunk.score.toFixed(2)}</span>
          </div>
          <div class="evidence-meta">${escapeHTML(chunk.source)} · ${escapeHTML(chunk.meta)}</div>
          <div class="evidence-snippet">${chunk.snippetHtml}</div>
          <div class="score-strip"><span>rerank</span><i style="--w:${Math.round(chunk.score * 100)}%"></i></div>
          <div class="evidence-actions">
            <button class="parent-toggle" type="button" data-parent-target="${targetId}">展开父块上下文 ↓</button>
            <span class="chunk-stats">child 256 / parent 1024</span>
          </div>
          <div class="parent-context" id="${targetId}" hidden><strong>PARENT CONTEXT</strong>${escapeHTML(chunk.parent)}</div>
        </article>
      `;
    }).join("");
    el.evidenceArea.innerHTML = cards;
  }

  function renderRagas(answer) {
    const { faithfulness, answerRelevancy, contextRelevancy } = answer.ragas;
    const overall = (faithfulness + answerRelevancy + contextRelevancy) / 3;
    el.ragasOverall.textContent = overall.toFixed(2);
    el.faithfulnessValue.textContent = faithfulness.toFixed(2);
    el.answerRelevancyValue.textContent = answerRelevancy.toFixed(2);
    el.contextRelevancyValue.textContent = contextRelevancy.toFixed(2);
    el.faithfulnessBar.style.width = `${Math.round(faithfulness * 100)}%`;
    el.answerRelevancyBar.style.width = `${Math.round(answerRelevancy * 100)}%`;
    el.contextRelevancyBar.style.width = `${Math.round(contextRelevancy * 100)}%`;

    [el.faithfulnessBar, el.answerRelevancyBar, el.contextRelevancyBar].forEach((bar) => {
      bar.parentElement.classList.toggle("orange", Boolean(answer.fallback));
    });

    if (answer.fallback) {
      el.ragasStatus.className = "ragas-status warn";
      el.ragasStatus.innerHTML = "<i></i><span>低于阈值 0.72 · 已触发联网兜底</span>";
    } else {
      el.ragasStatus.className = "ragas-status good";
      el.ragasStatus.innerHTML = "<i></i><span>质量通过 · 引用覆盖率 100% · 可人工复核</span>";
    }
  }

  function renderAnswerCard(answer, query) {
    const confidencePercent = Math.round(answer.confidence * 100);
    const confidenceClass = answer.confidence < 0.72 ? "low" : answer.confidence < 0.86 ? "medium" : "";
    const confidenceLabel = answer.fallback ? "LOW CONFIDENCE" : "HIGH CONFIDENCE";
    const citations = answer.citations.map((citation) => `
      <button class="answer-citation" type="button" data-citation-index="${citation.index}">
        <b>[${citation.index + 1}]</b>${escapeHTML(citation.ref)}
      </button>
    `).join("");
    const facts = answer.facts.map((fact) => `
      <div class="fact-cell"><span>${escapeHTML(fact.label)}</span><strong>${escapeHTML(fact.value)}</strong></div>
    `).join("");
    const steps = answer.steps.map((step) => `<li>${escapeHTML(step)}</li>`).join("");
    const fallbackBanner = answer.fallback ? `
      <div class="low-confidence-banner">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 3.5 21 20H3L12 3.5Z"/><path d="M12 9v4.5M12 16.5h.01"/></svg>
        <span>内部知识置信度 ${(answer.confidence * 100).toFixed(0)}%，低于 72% 阈值。系统已触发联网搜索，并将该问题加入知识库回流队列。</span>
      </div>
    ` : "";

    return `
      <div class="answer-card">
        <div class="answer-head">
          <span class="confidence-badge ${confidenceClass}"><i></i>${confidenceLabel} · ${confidencePercent}%</span>
          <span class="answer-source-note">${answer.citations.length} SOURCES · EVIDENCE BOUND</span>
        </div>
        <div class="answer-body">
          ${fallbackBanner}
          <h4>${escapeHTML(answer.title)}</h4>
          <p>${escapeHTML(answer.answer)}</p>
          <div class="answer-facts">${facts}</div>
          <ul class="answer-list">${steps}</ul>
          <div class="answer-citations">${citations}</div>
        </div>
        <div class="answer-toolbar">
          <button class="toolbar-btn" type="button" data-answer-action="copy">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>
            复制回答
          </button>
          <button class="toolbar-btn" type="button" data-answer-action="evidence">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 5.5h16v13H4z"/><path d="M8 9h8M8 12.5h8M8 16h5"/></svg>
            查看全部证据
          </button>
          <span class="toolbar-note">${answer.latencyMs} ms · ${answer.tokens} tokens</span>
        </div>
      </div>
    `;
  }

  function replaceTypingWithAnswer(typingNode, answer, query) {
    const main = typingNode.querySelector(".message-main");
    main.innerHTML = `
      <div class="message-meta"><strong>制造知识助手</strong><span>刚刚</span><em>RAG</em></div>
      ${renderAnswerCard(answer, query)}
    `;
    scrollChatToBottom();
  }

  async function runPipeline(answer) {
    setTraceSummary("running", "正在检索与生成", `已识别意图：${answer.intent}`);
    el.traceLatency.textContent = "...";
    setStage("understand", "running", "改写查询并识别实体…", "解析中");
    await sleep(300);
    setStage("understand", "done", `意图：${answer.intent}`, "完成");

    setStage("hybrid", "running", "BM25 + Vector 并行召回…", "召回中");
    await sleep(430);
    setStage("hybrid", "done", "召回 18 个候选块 · 双路融合", "完成");

    setStage("rerank", "running", "CrossEncoder 二次打分…", "精排中");
    await sleep(390);
    const topScore = Math.max(...answer.chunks.map((chunk) => chunk.score));
    setStage("rerank", "done", `保留 Top ${answer.chunks.length} · 最高 ${topScore.toFixed(2)}`, "完成");
    renderEvidence(answer);

    setStage("generate", "running", "基于证据约束生成答案…", "生成中");
    await sleep(520);
    setStage("generate", "done", `${answer.tokens} tokens · 引用已绑定`, "完成");

    setStage("evaluate", "running", "RAGAS 三维质量评估…", "评估中");
    await sleep(300);
    renderRagas(answer);
    setStage("evaluate", "done", "忠实度 / 相关性 / 上下文", "完成");

    if (answer.fallback) {
      el.fallbackStage.hidden = false;
      el.fallbackStage.classList.add("fallback", "done");
      el.fallbackStage.querySelector("small").textContent = "外部检索完成 · 已进入回流队列";
      el.fallbackStage.querySelector(".stage-state").textContent = "已触发";
      setTraceSummary("fallback", "低置信兜底已触发", "联网结果已引入 · 问题已加入回流队列");
    } else {
      setTraceSummary("", `${answer.chunks.length} 条证据 · 质量通过`, `${answer.intent} · 置信度 ${(answer.confidence * 100).toFixed(0)}%`);
    }

    el.traceLatency.textContent = `${answer.latencyMs} ms`;
  }

  async function askQuestion(query, forcedKey) {
    if (state.running) return;
    const text = String(query || "").trim();
    if (!text) {
      showToast("请输入一个具体问题");
      return;
    }

    cancelAutoRun();
    const answer = resolveAnswer(text, forcedKey);
    state.lastAnswer = answer;
    state.lastQuery = text;
    setBusy(true);
    appendUserMessage(text);
    const typing = appendTypingMessage();
    resetTrace();
    el.questionInput.value = "";

    await sleep(120);
    await runPipeline(answer);
    replaceTypingWithAnswer(typing, answer, text);
    setBusy(false);
    el.questionInput.focus();

    if (answer.fallback) {
      showToast("内部证据不足，已触发联网兜底并加入知识回流队列");
    }
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy");
        resolve();
      } catch (error) {
        reject(error);
      } finally {
        area.remove();
      }
    });
  }

  async function copyCurrentAnswer() {
    const answer = state.lastAnswer;
    if (!answer) return;
    const text = [
      answer.title,
      "",
      answer.answer,
      "",
      ...answer.facts.map((fact) => `- ${fact.label}：${fact.value}`),
      "",
      "建议动作：",
      ...answer.steps.map((step, index) => `${index + 1}. ${step}`),
      "",
      `综合置信度：${(answer.confidence * 100).toFixed(0)}%`,
      `引用来源：${answer.citations.map((item) => item.ref).join("；")}`,
      "",
      "由知序 · 企业 RAG 智能问答系统 Demo 生成（演示数据）"
    ].join("\n");
    try {
      await copyText(text);
      showToast("回答已复制到剪贴板");
    } catch (error) {
      showToast("复制失败，请手动选择文本");
    }
  }

  function openEvidenceModal(index) {
    const answer = state.lastAnswer;
    if (!answer || !answer.chunks[index]) return;
    const chunk = answer.chunks[index];
    state.modalReturnFocus = document.activeElement;
    el.modalKicker.textContent = "SOURCE EVIDENCE";
    el.modalTitle.textContent = chunk.title;
    el.modalMeta.innerHTML = `
      <span>${escapeHTML(chunk.source)}</span>
      <span>${escapeHTML(chunk.meta)}</span>
      <span>CHILD + PARENT</span>
    `;
    el.modalQuote.textContent = `${stripHTML(chunk.snippetHtml)}\n\n父块上下文：${chunk.parent}`;
    el.modalScoreLabel.textContent = "Rerank 相关性";
    el.modalScoreBar.style.width = `${Math.round(chunk.score * 100)}%`;
    el.modalScore.textContent = chunk.score.toFixed(2);
    el.evidenceModal.classList.add("open");
    el.evidenceModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    window.setTimeout(() => el.modalClose.focus(), 80);
  }

  function openDocModal(doc) {
    state.modalReturnFocus = document.activeElement;
    el.modalKicker.textContent = "DOCUMENT PREVIEW";
    el.modalTitle.textContent = doc.title;
    el.modalMeta.innerHTML = `
      <span>${escapeHTML(doc.type)}</span>
      <span>${escapeHTML(doc.meta)}</span>
      <span>INDEXED</span>
    `;
    el.modalQuote.textContent = doc.excerpt || doc.sample;
    el.modalScoreLabel.textContent = "索引完整度";
    el.modalScoreBar.style.width = "100%";
    el.modalScore.textContent = "100%";
    el.evidenceModal.classList.add("open");
    el.evidenceModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    window.setTimeout(() => el.modalClose.focus(), 80);
  }

  function closeModal() {
    el.evidenceModal.classList.remove("open");
    el.evidenceModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (state.modalReturnFocus && typeof state.modalReturnFocus.focus === "function") {
      state.modalReturnFocus.focus();
    }
    state.modalReturnFocus = null;
  }

  function updateSourceCount() {
    const count = el.docList.querySelectorAll(".doc-item").length;
    el.sourceCount.textContent = `${count} SOURCES`;
  }

  function fileTypeInfo(fileName) {
    const extension = fileName.split(".").pop().toLowerCase();
    if (extension === "pdf") return { label: "PDF", cls: "pdf", type: "PDF" };
    if (["doc", "docx"].includes(extension)) return { label: "DOC", cls: "docx", type: "DOCX" };
    if (["xls", "xlsx", "csv"].includes(extension)) return { label: "XLS", cls: "xlsx", type: "XLSX" };
    if (["ppt", "pptx"].includes(extension)) return { label: "PPT", cls: "ppt", type: "PPTX" };
    if (["png", "jpg", "jpeg", "webp"].includes(extension)) return { label: "IMG", cls: "image", type: "IMAGE" };
    if (extension === "eml") return { label: "EML", cls: "mail", type: "EML" };
    return { label: "TXT", cls: "txt", type: "TXT" };
  }

  async function simulateUpload(file) {
    if (!file) return;
    const info = fileTypeInfo(file.name);
    const id = `upload-${Date.now()}`;
    const item = document.createElement("button");
    item.className = "doc-item processing";
    item.type = "button";
    item.dataset.doc = id;
    item.innerHTML = `
      <span class="file-icon ${info.cls}">${info.label}</span>
      <span class="doc-copy">
        <strong>${escapeHTML(file.name)}</strong>
        <small>${info.type} · 解析队列</small>
        <span class="doc-progress"><i></i></span>
      </span>
      <span class="doc-state"><i></i>解析中</span>
    `;
    el.docList.prepend(item);
    updateSourceCount();
    el.docList.scrollTop = 0;

    const progress = item.querySelector(".doc-progress i");
    const progressValues = [18, 34, 56, 72, 88, 96];
    for (const value of progressValues) {
      await sleep(230);
      progress.style.width = `${value}%`;
    }
    await sleep(260);
    const chunks = 20 + Math.floor(Math.random() * 45);
    const doc = {
      title: file.name,
      type: info.type,
      meta: `${chunks} chunks · 刚刚完成解析`,
      excerpt: "文档已完成版面分析、语义切片与向量化。该文件由 Demo 上传流程模拟生成，用于展示多源知识接入体验。",
      sample: "模拟解析结果：已抽取文档文本与标题结构，生成子块 256 字符 / 父块 1,024 字符，并写入向量索引。"
    };
    state.uploadedDocs[id] = doc;
    item.classList.remove("processing");
    item.querySelector("small").textContent = `${info.type} · ${chunks} chunks`;
    item.querySelector(".doc-state").innerHTML = "<i></i>已索引";
    const progressWrap = item.querySelector(".doc-progress");
    if (progressWrap) progressWrap.remove();
    item.classList.add("selected");
    el.docItems.forEach((docItem) => {
      if (docItem !== item) docItem.classList.remove("selected");
    });
    showToast(`《${file.name}》已完成解析并新增 ${chunks} 个语义块`);
  }

  // Event bindings
  el.qaForm.addEventListener("submit", (event) => {
    event.preventDefault();
    askQuestion(el.questionInput.value);
  });

  el.questionInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      el.qaForm.requestSubmit();
    }
  });

  el.promptChips.forEach((button) => {
    button.addEventListener("click", () => {
      if (state.running) return;
      cancelAutoRun();
      const key = button.dataset.prompt;
      const query = key === "unknown"
        ? "海外供应商切换需要经过哪些合规审批？"
        : ANSWERS[key].prompt;
      el.questionInput.value = query;
      askQuestion(query, key);
    });
  });

  el.chatMessages.addEventListener("click", (event) => {
    const citation = event.target.closest("[data-citation-index]");
    if (citation) {
      openEvidenceModal(Number(citation.dataset.citationIndex));
      return;
    }
    const action = event.target.closest("[data-answer-action]");
    if (!action) return;
    if (action.dataset.answerAction === "copy") {
      copyCurrentAnswer();
    }
    if (action.dataset.answerAction === "evidence") {
      if (window.innerWidth <= 1120) {
        document.getElementById("workbench").scrollIntoView({ behavior: "smooth", block: "end" });
        showToast("证据面板已展开在当前页面下方");
      } else {
        el.evidenceArea.scrollIntoView({ behavior: "smooth", block: "nearest" });
        showToast("右侧展示的是本次回答的 Top-3 检索证据");
      }
    }
  });

  el.evidenceArea.addEventListener("click", (event) => {
    const toggle = event.target.closest(".parent-toggle");
    if (!toggle) return;
    const target = document.getElementById(toggle.dataset.parentTarget);
    if (!target) return;
    const willOpen = target.hidden;
    target.hidden = !willOpen;
    toggle.textContent = willOpen ? "收起父块上下文 ↑" : "展开父块上下文 ↓";
  });

  el.docSearch.addEventListener("input", () => {
    const query = el.docSearch.value.trim().toLowerCase();
    el.docList.querySelectorAll(".doc-item").forEach((item) => {
      const matches = !query || item.textContent.toLowerCase().includes(query);
      item.classList.toggle("is-filtered", !matches);
    });
  });

  el.docList.addEventListener("click", (event) => {
    const item = event.target.closest(".doc-item");
    if (!item) return;
    if (item.classList.contains("processing")) {
      showToast("文档正在解析中，请稍候");
      return;
    }
    el.docList.querySelectorAll(".doc-item").forEach((docItem) => docItem.classList.remove("selected"));
    item.classList.add("selected");
    const doc = DOCS[item.dataset.doc] || state.uploadedDocs[item.dataset.doc];
    if (doc) openDocModal(doc);
  });

  el.uploadButton.addEventListener("click", () => {
    el.fileUpload.click();
  });

  el.fileUpload.addEventListener("change", () => {
    const file = el.fileUpload.files && el.fileUpload.files[0];
    if (file) simulateUpload(file);
    el.fileUpload.value = "";
  });

  el.guardToggle.addEventListener("click", () => {
    state.guardEnabled = !state.guardEnabled;
    el.guardToggle.classList.toggle("is-on", state.guardEnabled);
    el.guardToggle.querySelector("span").textContent = state.guardEnabled ? "证据约束" : "自由生成";
    showToast(state.guardEnabled
      ? "证据约束已开启：回答必须绑定检索片段"
      : "证据约束已关闭：演示仍保留引用，便于对比");
  });
  el.guardToggle.classList.add("is-on");

  el.clearChat.addEventListener("click", () => {
    if (state.running) {
      showToast("当前回答生成中，请稍后再清空会话");
      return;
    }
    cancelAutoRun();
    el.chatMessages.innerHTML = WELCOME_MARKUP;
    el.questionInput.value = "";
    state.lastAnswer = null;
    state.lastQuery = "";
    resetTrace();
    showToast("会话已清空");
    el.questionInput.focus();
  });

  el.modalClose.addEventListener("click", closeModal);
  el.evidenceModal.addEventListener("click", (event) => {
    if (event.target === el.evidenceModal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && el.evidenceModal.classList.contains("open")) {
      closeModal();
    }
  });

  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".main-nav a").forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // The first query auto-plays so the page has a meaningful state when an
  // interviewer opens the link. Any user action cancels the pending auto-run.
  state.autoTimer = window.setTimeout(() => {
    if (document.visibilityState !== "hidden") {
      el.questionInput.value = ANSWERS.torque.prompt;
      askQuestion(ANSWERS.torque.prompt, "torque");
    }
  }, 850);
})();
