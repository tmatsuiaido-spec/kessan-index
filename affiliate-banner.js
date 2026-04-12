/**
 * affiliate-banner.js
 * 記事ページ末尾に証券口座アフィリエイトバナーを自動注入
 * 使い方: 各記事HTMLの </body> 直前に
 *   <script src="../affiliate-banner.js"></script>
 * を追加するだけ。
 *
 * ── リンクの差し替え方 ──
 * 下の BROKERS 配列の url を ASP から発行されたアフィリエイトURLに変更してください。
 * 画像URLも同様に差し替え可能です。
 */
(function () {

  /* =====================================================
     ★ 設定エリア — ここだけ書き換えればOK
     ===================================================== */
  const BROKERS = [
    {
      id:      'sbi',
      name:    'SBI証券',
      badge:   '口座数No.1',
      color:   '#e05a00',
      points:  ['国内株式手数料0円', 'IPO取扱数トップ', 'NISAに強い'],
      url:     'https://example.com/sbi-affiliate',   // ← ASPリンクに差し替え
      cta:     '無料で口座開設',
    },
    {
      id:      'rakuten',
      name:    '楽天証券',
      badge:   '楽天ポイント投資',
      color:   '#bf0000',
      points:  ['楽天ポイントで投資', '国内株手数料0円', 'アプリが使いやすい'],
      url:     'https://example.com/rakuten-affiliate', // ← ASPリンクに差し替え
      cta:     '無料で口座開設',
    },
    {
      id:      'monex',
      name:    'マネックス証券',
      badge:   '米国株に強い',
      color:   '#003087',
      points:  ['米国株手数料最安水準', '銘柄分析ツールが充実', 'NISAも対応'],
      url:     'https://example.com/monex-affiliate',  // ← ASPリンクに差し替え
      cta:     '無料で口座開設',
    },
  ];
  /* ===================================================== */

  // スタイル注入
  const css = `
    .aff-section {
      margin: 40px 0 0;
      padding: 0 28px 40px;
      font-family: "Hiragino Sans","Hiragino Kaku Gothic ProN","Noto Sans JP",sans-serif;
    }
    .aff-heading {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 700;
      color: #555;
      letter-spacing: .06em;
      margin-bottom: 14px;
    }
    .aff-heading::before {
      content: '';
      display: block;
      width: 3px; height: 16px;
      background: #2563eb;
      border-radius: 2px;
    }
    .aff-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
    @media (max-width: 600px) {
      .aff-grid { grid-template-columns: 1fr; }
      .aff-section { padding: 0 16px 40px; }
    }
    .aff-card {
      display: flex;
      flex-direction: column;
      border: 1.5px solid #e8edf3;
      border-radius: 10px;
      overflow: hidden;
      text-decoration: none;
      transition: transform .18s, box-shadow .18s;
      background: #fff;
    }
    .aff-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0,0,0,.1);
    }
    .aff-card-head {
      padding: 12px 14px 10px;
      border-bottom: 1px solid #f0f0f0;
    }
    .aff-card-badge {
      display: inline-block;
      font-size: 9px;
      padding: 2px 7px;
      border-radius: 3px;
      color: #fff;
      font-weight: 700;
      letter-spacing: .04em;
      margin-bottom: 6px;
    }
    .aff-card-name {
      font-size: 15px;
      font-weight: 700;
      color: #1a1a1a;
    }
    .aff-card-body {
      padding: 10px 14px;
      flex: 1;
    }
    .aff-card-points {
      list-style: none;
      padding: 0; margin: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .aff-card-points li {
      font-size: 11px;
      color: #555;
      padding-left: 14px;
      position: relative;
      line-height: 1.5;
    }
    .aff-card-points li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #2563eb;
      font-weight: 700;
      font-size: 10px;
    }
    .aff-card-cta {
      display: block;
      margin: 10px 14px 14px;
      padding: 9px 0;
      border-radius: 6px;
      text-align: center;
      font-size: 12px;
      font-weight: 700;
      color: #fff;
      letter-spacing: .04em;
      transition: filter .15s;
    }
    .aff-card:hover .aff-card-cta { filter: brightness(1.1); }
    .aff-disclaimer {
      margin-top: 10px;
      font-size: 10px;
      color: #aaa;
      text-align: center;
      line-height: 1.6;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // バナーHTML生成
  const html = `
    <div class="aff-section">
      <p class="aff-heading">この銘柄を実際に取引するには</p>
      <div class="aff-grid">
        ${BROKERS.map(b => `
        <a class="aff-card" href="${b.url}" target="_blank" rel="noopener sponsored">
          <div class="aff-card-head">
            <div class="aff-card-badge" style="background:${b.color}">${b.badge}</div>
            <div class="aff-card-name">${b.name}</div>
          </div>
          <div class="aff-card-body">
            <ul class="aff-card-points">
              ${b.points.map(p => `<li>${p}</li>`).join('')}
            </ul>
          </div>
          <div class="aff-card-cta" style="background:${b.color}">${b.cta}</div>
        </a>
        `).join('')}
      </div>
      <p class="aff-disclaimer">
        ※ 当サイトはアフィリエイトプログラムを利用しています。<br>
        リンク経由で口座開設いただくと当サイトに報酬が発生しますが、読者の皆様への費用負担は一切ありません。
      </p>
    </div>
  `;

  // .container の末尾に挿入
  function inject() {
    const container = document.querySelector('.container');
    if (!container) return;
    // 二重挿入防止
    if (container.querySelector('.aff-section')) return;
    container.insertAdjacentHTML('beforeend', html);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
