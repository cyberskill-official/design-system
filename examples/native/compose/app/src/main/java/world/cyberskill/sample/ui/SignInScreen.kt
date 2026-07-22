package world.cyberskill.sample.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import world.cyberskill.sample.tokens.CSTokens

@Composable
fun SignInScreen(onSuccess: () -> Unit) {
  var email by remember { mutableStateOf("you@cyberskill.world") }
  var password by remember { mutableStateOf("") }
  Column(
    modifier = Modifier
      .fillMaxSize()
      .background(CSTokens.colorSurfacePage)
      .padding(24.dp),
    verticalArrangement = Arrangement.spacedBy(16.dp),
  ) {
    Text("Sign in", color = CSTokens.colorTextPrimary, fontSize = 28.sp)
    Text(
      "Welcome back. Đăng nhập để tiếp tục.",
      color = CSTokens.colorTextMuted,
      fontSize = 15.sp,
    )
    OutlinedTextField(
      value = email,
      onValueChange = { email = it },
      label = { Text("Work email") },
      modifier = Modifier.fillMaxWidth(),
    )
    OutlinedTextField(
      value = password,
      onValueChange = { password = it },
      label = { Text("Password") },
      modifier = Modifier.fillMaxWidth(),
    )
    Spacer(modifier = Modifier.height(8.dp))
    Button(
      onClick = onSuccess,
      modifier = Modifier
        .fillMaxWidth()
        .height(CSTokens.componentButtonMdMinHeight),
      colors = ButtonDefaults.buttonColors(
        containerColor = CSTokens.componentButtonPrimaryBg,
        contentColor = CSTokens.componentButtonPrimaryFg,
      ),
      shape = RoundedCornerShape(CSTokens.componentButtonRadius),
    ) {
      Text("Sign in")
    }
  }
}
