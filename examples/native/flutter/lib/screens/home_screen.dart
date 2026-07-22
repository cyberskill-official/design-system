import 'package:flutter/material.dart';
import '../tokens/cs_tokens.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  static const _wishes = [
    ('Status hub refresh', 'In build'),
    ('VN labor contract pack', 'Open'),
    ('BOD investor update', 'Done'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Row(
                children: [
                  Text(
                    'Wishes',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.w800,
                      color: CSTokens.colorTextPrimary,
                    ),
                  ),
                  const Spacer(),
                  TextButton(
                    onPressed: () =>
                        Navigator.of(context).pushNamed('/settings'),
                    child: Text(
                      'Settings',
                      style: TextStyle(color: CSTokens.colorLink),
                    ),
                  ),
                ],
              ),
              Text(
                'List screen — Flutter consumes generated CSTokens.',
                style: TextStyle(fontSize: 13, color: CSTokens.colorTextMuted),
              ),
              const SizedBox(height: 16),
              Container(
                decoration: BoxDecoration(
                  color: CSTokens.colorSurfacePanel,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: CSTokens.colorBorderDefault),
                ),
                child: Column(
                  children: [
                    for (final w in _wishes)
                      ListTile(
                        title: Text(
                          w.$1,
                          style: TextStyle(
                            color: CSTokens.colorTextPrimary,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        subtitle: Text(
                          w.$2,
                          style: TextStyle(color: CSTokens.colorTextMuted),
                        ),
                        trailing: Container(
                          width: 10,
                          height: 10,
                          decoration: BoxDecoration(
                            color: CSTokens.colorBrandOchre,
                            shape: BoxShape.circle,
                          ),
                        ),
                      ),
                  ],
                ),
              ),
              const Spacer(),
              TextButton(
                onPressed: () =>
                    Navigator.of(context).pushReplacementNamed('/sign-in'),
                child: Text(
                  'Sign out',
                  style: TextStyle(color: CSTokens.colorSemanticDanger),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
