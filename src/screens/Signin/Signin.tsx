/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout } from '@components/Layout/Layout';
import { useUser } from '@contexts/UserContext/useUser';
import { Button, Icon, Input, Text } from '@design-system/components';
import { useTheme } from '@design-system/theme/ThemeContext';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getSignInStyles } from './Signin.styles';
import { NavigationProp, useNavigation } from '@react-navigation/native';

function SignIn() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getSignInStyles(theme, insets);
  const { createUser, login } = useUser();
  const navigation = useNavigation<NavigationProp<any>>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    general: '',
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUrl = (url: string): boolean => {
    if (!url) return true; // Avatar é opcional
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSignIn = async () => {
    setErrors({ name: '', email: '', password: '', confirmPassword: '', general: '' });
    setSuccess(false);

    let hasError = false;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      general: '',
    };

    // Validação do nome
    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      hasError = true;
    } else if (name.trim().length < 3) {
      newErrors.name = 'Nome deve ter no mínimo 3 caracteres';
      hasError = true;
    }

    // Validação do e-mail
    if (!email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
      hasError = true;
    } else if (!validateEmail(email)) {
      newErrors.email = 'E-mail inválido';
      hasError = true;
    }

    // Validação da senha
    if (!password.trim()) {
      newErrors.password = 'Senha é obrigatória';
      hasError = true;
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
      hasError = true;
    }

    // Validação da confirmação de senha
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
      hasError = true;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
      hasError = true;
    }

    // Validação do avatar (opcional)
    if (avatar && !validateUrl(avatar)) {
      newErrors.general = 'URL do avatar inválida';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      await createUser({
        name: name.trim(),
        email: email.trim(),
        password,
        avatar: avatar.trim() || 'https://via.placeholder.com/150',
      });
      setSuccess(true);

      // Aguarda 1 segundo e faz login automaticamente
      setTimeout(async () => {
        try {
          await login(email.trim(), password);
          navigation.navigate('Tabs', { screen: 'Profile' });
        } catch {
          setErrors({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            general: 'Conta criada com sucesso! Faça login para continuar.',
          });
        }
      }, 1500);
    } catch {
      setErrors({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        general: 'Erro ao criar conta. Este e-mail pode já estar em uso.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contentWrapper}>
            <View style={styles.headerContainer}>
              <View style={styles.logoIconWrapper}>
                <Icon
                  family="MaterialIcons"
                  name="person-add"
                  size={40}
                  color={theme.colors.primary}
                />
              </View>
              <Text variant="h1" style={styles.title}>
                Criar Conta
              </Text>
              <Text variant="body1" style={styles.subtitle}>
                Preencha os dados para criar sua conta
              </Text>
            </View>

            {success && (
              <View style={styles.successContainer}>
                <Text variant="caption" style={styles.successText}>
                  Conta criada com sucesso! Redirecionando...
                </Text>
              </View>
            )}

            {errors.general && (
              <View style={styles.errorContainer}>
                <Text variant="caption" style={styles.errorText}>
                  {errors.general}
                </Text>
              </View>
            )}

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Input
                  label="Nome completo"
                  placeholder="Seu nome"
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                    if (errors.name) {
                      setErrors({ ...errors, name: '' });
                    }
                  }}
                  error={errors.name}
                  autoCapitalize="words"
                  autoComplete="name"
                  leftIcon={
                    <Icon
                      family="MaterialIcons"
                      name="person"
                      size={20}
                      color={errors.name ? theme.colors.error : theme.colors.text.secondary}
                    />
                  }
                />
              </View>

              <View style={styles.inputContainer}>
                <Input
                  label="E-mail"
                  placeholder="seu@email.com"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email) {
                      setErrors({ ...errors, email: '' });
                    }
                  }}
                  error={errors.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  leftIcon={
                    <Icon
                      family="MaterialIcons"
                      name="email"
                      size={20}
                      color={errors.email ? theme.colors.error : theme.colors.text.secondary}
                    />
                  }
                />
              </View>

              <View style={styles.inputContainer}>
                <Input
                  label="Senha"
                  placeholder="••••••••"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errors.password) {
                      setErrors({ ...errors, password: '' });
                    }
                  }}
                  error={errors.password}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                  leftIcon={
                    <Icon
                      family="MaterialIcons"
                      name="lock"
                      size={20}
                      color={errors.password ? theme.colors.error : theme.colors.text.secondary}
                    />
                  }
                  rightIcon={
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      <Icon
                        family="MaterialIcons"
                        name={showPassword ? 'visibility-off' : 'visibility'}
                        size={20}
                        color={theme.colors.text.secondary}
                      />
                    </Pressable>
                  }
                />
              </View>

              <View style={styles.inputContainer}>
                <Input
                  label="Confirmar senha"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (errors.confirmPassword) {
                      setErrors({ ...errors, confirmPassword: '' });
                    }
                  }}
                  error={errors.confirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                  leftIcon={
                    <Icon
                      family="MaterialIcons"
                      name="lock"
                      size={20}
                      color={
                        errors.confirmPassword ? theme.colors.error : theme.colors.text.secondary
                      }
                    />
                  }
                  rightIcon={
                    <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <Icon
                        family="MaterialIcons"
                        name={showConfirmPassword ? 'visibility-off' : 'visibility'}
                        size={20}
                        color={theme.colors.text.secondary}
                      />
                    </Pressable>
                  }
                />
              </View>

              <View style={styles.inputContainer}>
                <Input
                  label="Avatar (opcional)"
                  placeholder="https://exemplo.com/avatar.jpg"
                  value={avatar}
                  onChangeText={setAvatar}
                  keyboardType="url"
                  autoCapitalize="none"
                  autoComplete="off"
                  leftIcon={
                    <Icon
                      family="MaterialIcons"
                      name="image"
                      size={20}
                      color={theme.colors.text.secondary}
                    />
                  }
                />
                <View style={styles.avatarInfo}>
                  <Text style={styles.avatarInfoText}>
                    URL da imagem para seu avatar (pode ser adicionado depois)
                  </Text>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  fullWidth
                  onPress={handleSignIn}
                  loading={isLoading}
                  disabled={isLoading || success}
                >
                  Criar Conta
                </Button>
              </View>
            </View>

            <View style={styles.loginContainer}>
              <Text variant="body1" style={styles.loginText}>
                Já tem uma conta?
              </Text>
              <Pressable onPress={() => navigation.navigate('Login')}>
                <Text variant="body1" style={styles.loginLink}>
                  Fazer login
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
}

export default SignIn;
