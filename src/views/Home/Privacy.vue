<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="privacy-page">
    <div class="container">
      <h1 class="page-title">隐私政策</h1>
      
      <div class="privacy-content">
        <section class="privacy-section">
          <h2>引言</h2>
          <p>Global PropAI（"我们"、"我们的"或"本公司"）尊重您的隐私，并致力于保护您的个人数据。本隐私政策将告知您我们如何处理您的个人数据，包括当您访问我们的网站、使用我们的服务或与我们互动时收集的数据，以及您的隐私权和法律保护。</p>
          <p>请仔细阅读本政策，以了解我们如何处理您的个人数据以及您的权利。</p>
        </section>
        
        <section class="privacy-section">
          <h2>我们收集的数据</h2>
          <p>我们可能收集、使用、存储和传输不同类型的个人数据，包括但不限于：</p>
          
          <ul class="privacy-list">
            <li>
              <strong>身份数据</strong>：包括姓名、用户名或类似标识符、出生日期等。
            </li>
            <li>
              <strong>联系数据</strong>：包括电子邮件地址、电话号码、邮寄地址等。
            </li>
            <li>
              <strong>技术数据</strong>：包括IP地址、浏览器类型和版本、位置、操作系统等。
            </li>
            <li>
              <strong>使用数据</strong>：包括有关您如何使用我们的网站和服务的信息。
            </li>
            <li>
              <strong>偏好数据</strong>：包括您的偏好设置、关注的市场和投资兴趣等。
            </li>
          </ul>
        </section>
        
        <section class="privacy-section">
          <h2>我们如何收集您的数据</h2>
          <p>我们通过以下方式收集您的个人数据：</p>
          
          <ul class="privacy-list">
            <li>
              <strong>直接互动</strong>：当您注册账户、填写表单、订阅我们的服务或与我们通信时。
            </li>
            <li>
              <strong>自动技术</strong>：当您与我们的网站互动时，我们会自动收集技术数据。
            </li>
            <li>
              <strong>第三方</strong>：我们可能从第三方和公共来源接收个人数据。
            </li>
          </ul>
        </section>
        
        <section class="privacy-section">
          <h2>我们如何使用您的数据</h2>
          <p>我们将仅在法律允许的情况下使用您的个人数据。最常见的情况是：</p>
          
          <ul class="privacy-list">
            <li>
              <strong>履行合同</strong>：处理您的订单或提供您请求的服务。
            </li>
            <li>
              <strong>合法利益</strong>：当我们需要进行业务运营或为您提供最佳服务和体验时。
            </li>
            <li>
              <strong>遵守法律义务</strong>：当我们需要遵守法律或监管要求时。
            </li>
            <li>
              <strong>征得同意</strong>：当您明确同意我们处理您的个人数据时。
            </li>
          </ul>
        </section>
        
        <section class="privacy-section">
          <h2>数据安全</h2>
          <p>我们已实施适当的安全措施，以防止您的个人数据被意外丢失、未经授权访问、使用、更改或披露。我们限制只有那些出于业务需要而必须访问个人数据的员工、代理商、承包商和其他第三方才能访问您的个人数据。</p>
        </section>
        
        <section class="privacy-section">
          <h2>数据保留</h2>
          <p>我们将仅在必要时间内保留您的个人数据，以实现我们收集数据的目的，包括满足任何法律、会计或报告要求。</p>
        </section>
        
        <section class="privacy-section">
          <h2>您的法律权利</h2>
          <p>根据数据保护法，您有权：</p>
          
          <ul class="privacy-list">
            <li>
              <strong>请求访问</strong>您的个人数据。
            </li>
            <li>
              <strong>请求更正</strong>我们持有的关于您的个人数据。
            </li>
            <li>
              <strong>请求删除</strong>您的个人数据。
            </li>
            <li>
              <strong>反对处理</strong>您的个人数据。
            </li>
            <li>
              <strong>请求限制处理</strong>您的个人数据。
            </li>
            <li>
              <strong>请求转移</strong>您的个人数据。
            </li>
            <li>
              <strong>撤回同意</strong>。
            </li>
          </ul>
        </section>
        
        <section class="privacy-section">
          <h2>Cookie政策</h2>
          <p>我们使用Cookie和类似技术来收集有关您使用我们网站的信息。Cookie是存储在您浏览器中的小型文本文件，用于记住您的偏好和设置。</p>
          <p>您可以通过浏览器设置控制和删除Cookie。但是，如果您禁用或拒绝Cookie，我们网站的某些部分可能无法正常工作。</p>
        </section>
        
        <section class="privacy-section">
          <h2>政策更新</h2>
          <p>我们可能会不时更新本隐私政策。我们将在网站上发布任何更改，并在进行重大更改时通知您。</p>
          <p>最后更新日期：2025年10月15日</p>
        </section>
        
        <section class="privacy-section">
          <h2>联系我们</h2>
          <p>如果您对本隐私政策有任何疑问，或想行使您的法律权利，请联系我们：</p>
          
          <div class="contact-info">
            <p><strong>电子邮件</strong>：privacy@globalpropai.com</p>
            <p><strong>邮寄地址</strong>：123 AI Drive, San Francisco, CA 94105, USA</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.privacy-page {
  padding-top: 100px;
  padding-bottom: 50px;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-title {
  text-align: center;
  font-size: 36px;
  margin-bottom: 40px;
  color: var(--text-color);
}

.privacy-content {
  background-color: var(--bg-color);
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 5px 15px var(--shadow-color);
}

.privacy-section {
  margin-bottom: 30px;
}

.privacy-section:last-child {
  margin-bottom: 0;
}

.privacy-section h2 {
  font-size: 24px;
  margin-bottom: 15px;
  color: var(--text-color);
}

.privacy-section p {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-color);
  margin-bottom: 15px;
}

.privacy-list {
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 15px;
}

.privacy-list li {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-color);
  margin-bottom: 10px;
}

.contact-info {
  background-color: var(--bg-light-color);
  padding: 20px;
  border-radius: 8px;
  margin-top: 15px;
}

.contact-info p {
  margin-bottom: 10px;
}

.contact-info p:last-child {
  margin-bottom: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .privacy-content {
    padding: 30px 20px;
  }
  
  .page-title {
    font-size: 28px;
  }
  
  .privacy-section h2 {
    font-size: 20px;
  }
}
</style>