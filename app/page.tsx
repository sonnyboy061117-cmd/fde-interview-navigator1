'use client';

import { useMemo, useState } from 'react';

type Status = 'received' | 'missing' | 'review';
type Material = { id:string; name:string; status:Status; source:string; evidence:string; rule:string; note:string };
type Claim = { id:string; label:string; claimant:string; product:string; reportedAt:string; scene:string; materials:Material[] };

const claims:Claim[] = [
  { id:'CLM-2026-1108', label:'缺件待补充', claimant:'林若安', product:'安心车险 · 机动车损失', reportedAt:'2026-11-24 09:18', scene:'车辆追尾，已完成首次报案。维修报价尚未上传。', materials:[
    { id:'identity', name:'被保险人身份证明', status:'received', source:'影像系统 · IMG-8841', evidence:'身份证正反面，2026-11-24 09:23 收到', rule:'CAR-FNOL-01 §2.1', note:'姓名与保单投保人一致。' },
    { id:'policy', name:'保单与报案信息', status:'received', source:'案件系统 · POLICY-4172', evidence:'保单有效期覆盖事故日期', rule:'CAR-FNOL-01 §2.2', note:'仅核对存在性，不判断保险责任。' },
    { id:'scene', name:'事故现场照片', status:'received', source:'影像系统 · IMG-8846', evidence:'4 张现场照片，带上传时间', rule:'CAR-FNOL-02 §3.1', note:'照片可打开，未判断事故原因。' },
    { id:'quote', name:'维修报价单', status:'missing', source:'未在三处记录中定位', evidence:'影像、案件、沟通记录均未发现', rule:'CAR-FNOL-02 §3.4', note:'需要人工确认是否已通过线下渠道接收。' },
    { id:'contact', name:'客户联系方式确认', status:'review', source:'沟通记录 · MSG-231', evidence:'登记号码与来电号码末四位不一致', rule:'OPS-DATA-03 §1.3', note:'存在冲突，不自动选边，转人工核对。' }
  ]},
  { id:'CLM-2026-1112', label:'材料已齐备', claimant:'周予宁', product:'安心车险 · 机动车损失', reportedAt:'2026-11-25 14:06', scene:'停车场剐蹭，首次报案材料已完成只读核对。', materials:[
    { id:'identity', name:'被保险人身份证明', status:'received', source:'影像系统 · IMG-8912', evidence:'身份证正反面，2026-11-25 14:11 收到', rule:'CAR-FNOL-01 §2.1', note:'姓名与保单投保人一致。' },
    { id:'policy', name:'保单与报案信息', status:'received', source:'案件系统 · POLICY-4220', evidence:'保单有效期覆盖事故日期', rule:'CAR-FNOL-01 §2.2', note:'仅核对存在性，不判断保险责任。' },
    { id:'scene', name:'事故现场照片', status:'received', source:'影像系统 · IMG-8915', evidence:'6 张现场照片，均可打开', rule:'CAR-FNOL-02 §3.1', note:'未发现文件损坏。' },
    { id:'quote', name:'维修报价单', status:'received', source:'影像系统 · DOC-2048', evidence:'报价单 1 份，含维修机构抬头', rule:'CAR-FNOL-02 §3.4', note:'仅确认材料存在，不审核报价金额。' },
    { id:'contact', name:'客户联系方式确认', status:'received', source:'案件系统 · CONTACT-90', evidence:'登记号码与本次确认号码一致', rule:'OPS-DATA-03 §1.3', note:'材料包可交由一线人员最终确认。' }
  ]},
  { id:'CLM-2026-1115', label:'来源有冲突', claimant:'陈嘉禾', product:'安心车险 · 机动车损失', reportedAt:'2026-11-26 08:42', scene:'倒车碰撞；案件系统与补充说明中的事故日期不一致。', materials:[
    { id:'identity', name:'被保险人身份证明', status:'received', source:'影像系统 · IMG-8991', evidence:'身份证正反面，文件可打开', rule:'CAR-FNOL-01 §2.1', note:'姓名与保单投保人一致。' },
    { id:'policy', name:'保单与报案信息', status:'review', source:'案件系统 / 沟通记录', evidence:'事故日期分别记录为 11 月 25 日与 11 月 24 日', rule:'CAR-FNOL-01 §2.2', note:'两个来源冲突，必须由经办人确认。' },
    { id:'scene', name:'事故现场照片', status:'received', source:'影像系统 · IMG-8997', evidence:'3 张现场照片，带上传时间', rule:'CAR-FNOL-02 §3.1', note:'未使用图片推断事故日期。' },
    { id:'quote', name:'维修报价单', status:'missing', source:'未在三处记录中定位', evidence:'仅发现维修机构名称，无正式报价文件', rule:'CAR-FNOL-02 §3.4', note:'机构名称不能替代报价单。' },
    { id:'contact', name:'客户联系方式确认', status:'received', source:'沟通记录 · MSG-246', evidence:'客户已在本次通话中复核号码', rule:'OPS-DATA-03 §1.3', note:'保留确认时间与来源。' }
  ]}
];

const meta:Record<Status,{label:string;tone:string;icon:string}> = {
  received:{label:'已收到',tone:'good',icon:'✓'},
  missing:{label:'缺失',tone:'bad',icon:'!'},
  review:{label:'需人工确认',tone:'warn',icon:'?'}
};
const cls = (...items:(string|false)[]) => items.filter(Boolean).join(' ');

export default function Home(){
  const [activeId,setActiveId]=useState(claims[0].id);
  const [selected,setSelected]=useState('quote');
  const [filter,setFilter]=useState<'all'|Status>('all');
  const active=claims.find(c=>c.id===activeId) || claims[0];
  const counts=useMemo(()=>({
    received:active.materials.filter(x=>x.status==='received').length,
    missing:active.materials.filter(x=>x.status==='missing').length,
    review:active.materials.filter(x=>x.status==='review').length
  }),[active]);
  const list=active.materials.filter(x=>filter==='all'||x.status===filter);
  const detail=active.materials.find(x=>x.id===selected)||active.materials[0];
  const ready=counts.missing===0&&counts.review===0;
  const choose=(id:string)=>{const next=claims.find(c=>c.id===id)||claims[0];setActiveId(id);setSelected((next.materials.find(x=>x.status!=='received')||next.materials[0]).id);setFilter('all')};

  return <main>
    <header className="topbar">
      <a className="brand" href="#top"><span className="brandMark">C</span><span><strong>卡尔德保险</strong><small>材料核对台 · 训练演示</small></span></a>
      <div className="safety"><span/>只读模式 · 不触发核赔或外发</div>
    </header>

    <section className="hero" id="top">
      <div><p className="eyebrow">FIRST NOTICE OF LOSS · MATERIAL CHECK</p><h1>一笔报案，<em>一次看清</em>材料状态。</h1><p className="heroCopy">把分散在案件、影像与沟通记录里的材料拼成一份可核对清单。每个结论都能看到来源、规则和人工边界。</p></div>
      <div className="heroNote"><span>本次只做一件事</span><strong>首次报案材料核对</strong><p>不判断保险责任，不计算赔付，不自动联系客户。</p></div>
    </section>

    <section className="workspace" aria-label="报案材料核对工作区">
      <aside className="caseRail">
        <div className="sectionLabel"><span>模拟案件</span><b>{claims.length}</b></div>
        <div className="caseList">{claims.map(c=>{const attention=c.materials.filter(x=>x.status!=='received').length;return <button key={c.id} className={cls('caseButton',c.id===active.id&&'active')} onClick={()=>choose(c.id)}><span className="caseTop"><b>{c.id}</b><i>{attention||'✓'}</i></span><strong>{c.label}</strong><small>{c.claimant} · {c.reportedAt.slice(5,16)}</small></button>})}</div>
        <div className="railFoot"><b>规则版本</b><span>FNOL 2026.11</span><small>快照时间 11-26 10:30</small></div>
      </aside>

      <div className="caseMain">
        <div className="caseHeader"><div><p className="eyebrow">{active.id}</p><h2>{active.claimant}的首次报案</h2><p>{active.product} · 报案时间 {active.reportedAt}</p></div><span className={cls('overall',ready?'ready':'hold')}>{ready?'材料已齐备，待人工确认':'暂不交接，存在待处理项'}</span></div>
        <p className="scene">{active.scene}</p>
        <div className="summaryGrid">
          <button className={filter==='all'?'selected':''} onClick={()=>setFilter('all')}><span>全部材料</span><strong>{active.materials.length}</strong></button>
          <button className={filter==='received'?'selected':''} onClick={()=>setFilter('received')}><span>已收到</span><strong className="green">{counts.received}</strong></button>
          <button className={filter==='missing'?'selected':''} onClick={()=>setFilter('missing')}><span>缺失</span><strong className="red">{counts.missing}</strong></button>
          <button className={filter==='review'?'selected':''} onClick={()=>setFilter('review')}><span>需人工确认</span><strong className="amber">{counts.review}</strong></button>
        </div>
        <div className="materialLayout">
          <div className="materialList">{list.length?list.map(item=>{const m=meta[item.status];return <button key={item.id} className={cls('materialRow',detail.id===item.id&&'active')} onClick={()=>setSelected(item.id)}><span className={cls('statusIcon',m.tone)}>{m.icon}</span><span className="materialName"><strong>{item.name}</strong><small>{item.source}</small></span><span className={cls('statusPill',m.tone)}>{m.label}</span><span className="chevron">→</span></button>}):<p className="empty">这个筛选下没有材料。</p>}</div>
          <aside className="evidenceCard" aria-live="polite">
            <div className="evidenceTop"><span className={cls('statusIcon',meta[detail.status].tone)}>{meta[detail.status].icon}</span><div><small>判断详情</small><h3>{detail.name}</h3></div></div>
            <dl><div><dt>判断结果</dt><dd><span className={cls('statusPill',meta[detail.status].tone)}>{meta[detail.status].label}</span></dd></div><div><dt>证据</dt><dd>{detail.evidence}</dd></div><div><dt>规则依据</dt><dd><code>{detail.rule}</code></dd></div><div><dt>处理说明</dt><dd>{detail.note}</dd></div></dl>
            {detail.status!=='received'&&<div className="humanGate"><b>人工关卡</b><p>系统只标记问题，不替经办人补齐、选边或确认。</p></div>}
          </aside>
        </div>
      </div>
    </section>

    <section className="principles"><div><span>01</span><h3>来源可追溯</h3><p>每项材料保留系统、记录号与时间。</p></div><div><span>02</span><h3>冲突不选边</h3><p>来源不一致时直接标记为人工确认。</p></div><div><span>03</span><h3>判断不过界</h3><p>只核对材料，不作核赔或赔付决定。</p></div></section>
    <footer><span>卡尔德保险材料核对台</span><p>所有人物、案件与数据均为合成训练内容。</p><a href="https://github.com/sonnyboy061117-cmd/fde-interview-navigator1">查看项目资料 ↗</a></footer>
  </main>
}
