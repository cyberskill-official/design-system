package world.cyberskill.sample.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import world.cyberskill.sample.tokens.CSTokens

private data class Wish(val title: String, val status: String)

@Composable
fun HomeScreen(onOpenSettings: () -> Unit, onSignOut: () -> Unit) {
  val wishes = listOf(
    Wish("Status hub refresh", "In build"),
    Wish("VN labor contract pack", "Open"),
    Wish("BOD investor update", "Done"),
  )
  Column(
    modifier = Modifier
      .fillMaxSize()
      .background(CSTokens.colorSurfacePage)
      .padding(24.dp),
    verticalArrangement = Arrangement.spacedBy(12.dp),
  ) {
    Row(Modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
      Text("Wishes", color = CSTokens.colorTextPrimary, fontSize = 24.sp)
      Spacer(Modifier = Modifier.weight(1f))
      TextButton(onClick = onOpenSettings) {
        Text("Settings", color = CSTokens.colorLink)
      }
    }
    Text(
      "List screen — Compose consumes generated CSTokens.",
      color = CSTokens.colorTextMuted,
      fontSize = 13.sp,
    )
    Column(
      modifier = Modifier
        .fillMaxWidth()
        .clip(RoundedCornerShape(12.dp))
        .border(1.dp, CSTokens.colorBorderDefault, RoundedCornerShape(12.dp))
        .background(CSTokens.colorSurfacePanel),
    ) {
      wishes.forEach { wish ->
        Row(
          modifier = Modifier
            .fillMaxWidth()
            .padding(14.dp),
          verticalAlignment = Alignment.CenterVertically,
        ) {
          Column(modifier = Modifier.weight(1f)) {
            Text(wish.title, color = CSTokens.colorTextPrimary, fontSize = 15.sp)
            Text(wish.status, color = CSTokens.colorTextMuted, fontSize = 12.sp)
          }
          Spacer(
            modifier = Modifier
              .size(10.dp)
              .clip(CircleShape)
              .background(CSTokens.colorBrandOchre),
          )
        }
      }
    }
    Spacer(modifier = Modifier.weight(1f))
    TextButton(onClick = onSignOut) {
      Text("Sign out", color = CSTokens.colorSemanticDanger)
    }
  }
}
