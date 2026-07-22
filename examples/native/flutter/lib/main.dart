import 'package:flutter/material.dart';
import 'screens/home_screen.dart';
import 'screens/settings_screen.dart';
import 'screens/sign_in_screen.dart';
import 'tokens/cs_tokens.dart';

/// Multi-screen Flutter sample: SignIn → Home → Settings.
/// Colours from generated [CSTokens] (synced from tokens/native/cs_tokens.dart).
void main() {
  runApp(const CyberSkillSampleApp());
}

class CyberSkillSampleApp extends StatelessWidget {
  const CyberSkillSampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CyberSkill Sample',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.light(
          primary: CSTokens.colorBrandUmber,
          secondary: CSTokens.colorBrandOchre,
          surface: CSTokens.colorSurfacePanel,
        ),
        scaffoldBackgroundColor: CSTokens.colorSurfacePage,
        useMaterial3: true,
      ),
      initialRoute: '/sign-in',
      routes: {
        '/sign-in': (_) => const SignInScreen(),
        '/home': (_) => const HomeScreen(),
        '/settings': (_) => const SettingsScreen(),
      },
    );
  }
}
