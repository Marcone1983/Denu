exports.handler = async (event, context) => {
  console.log('🚨 Claude AI Emergency Function - EMAILJS REAL EMAIL SENDING');
  
  const timestamp = new Date().toISOString();
  
  try {
    // 🧪 EMAIL DELIVERY TEST - 4 CONTROLLED TARGETS
    const targets = [
      { email: 'whitecasteddu@gmail.com', type: 'TEST EMAIL 1' },
      { email: 'liorimarco55@gmail.com', type: 'TEST EMAIL 2' },
      { email: 'claude.emergency.system@gmail.com', type: 'TEST EMAIL 3' },
      { email: 'geniettigenio@gmail.com', type: 'TEST EMAIL 4' }
    ];
    
    console.log(`📧 EMAILJS REAL SENDING: Sending to ${targets.length} controlled email addresses...`);
    
    let successCount = 0;
    let errorCount = 0;
    
    // EmailJS configuration
    const emailjsConfig = {
      publicKey: 'BaGtSbrwoYXOXnSOL',
      serviceId: 'service_o1kq2dq',
      templateId: 'template_a857pdj'
    };
    
    // Send emails using EmailJS
    for (const target of targets) {
      try {
        console.log(`📤 Sending to ${target.type}: ${target.email}`);
        
        // EmailJS send parameters
        const templateParams = {
          to_email: target.email,
          timestamp: timestamp
        };
        
        // EmailJS API call
        const emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            service_id: emailjsConfig.serviceId,
            template_id: emailjsConfig.templateId,
            user_id: emailjsConfig.publicKey,
            template_params: templateParams
          })
        });
        
        if (emailjsResponse.ok) {
          console.log(`✅ EmailJS email sent to ${target.type}: ${target.email}`);
          successCount++;
        } else {
          const errorText = await emailjsResponse.text();
          console.log(`❌ Failed to send to ${target.email}: ${emailjsResponse.status} - ${errorText}`);
          errorCount++;
        }
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
        
      } catch (emailError) {
        console.error(`❌ Error sending to ${target.email}:`, emailError);
        errorCount++;
      }
    }
    
    // Success response
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        status: 'success', 
        message: 'Claude AI EmailJS Emergency Function executed!',
        emailsSent: successCount,
        emailsFailed: errorCount,
        totalTargets: targets.length,
        provider: 'EmailJS',
        testPhase: 'REAL EMAIL DELIVERY TEST',
        timestamp: timestamp,
        details: `Sent ${successCount}/${targets.length} emails successfully`
      })
    };
    
  } catch (error) {
    console.error('❌ Claude AI EmailJS Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        status: 'error', 
        message: error.message,
        provider: 'EmailJS',
        timestamp: timestamp
      })
    };
  }
};
