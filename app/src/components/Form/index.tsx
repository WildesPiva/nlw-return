import React, { useState } from "react";
import { View, TextInput, Image, Text, TouchableOpacity } from "react-native";
import * as FileSystem from "expo-file-system";
import { captureScreen } from "react-native-view-shot";

import { ArrowLeft } from "phosphor-react-native";

import { FeedbackType } from "../../components/Widget";
import { ScreenshotButton } from "../../components/ScreenshotButton";
import { Button } from "../../components/Button";

import { feedbackTypes } from "../../utils/feedbackTypes";

import { api } from "../../libs/api";

import { theme } from "../../theme";
import { styles } from "./styles";

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({
  feedbackType,
  onFeedbackCanceled,
  onFeedbackSent,
}: Props) {
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const handleScreenshot = async () => {
    const uri = await captureScreen({
      format: "jpg",
      quality: 0.8,
    });
    setScreenshot(uri);
  };

  const handleScreenshotRemove = () => {
    setScreenshot(null);
  };

  const handleSentFeedback = async () => {
    if (isSendingFeedback) {
      return;
    }

    setIsSendingFeedback(true);

    const prefix = "data:image/png;base64, ";
    let screenshotBase64;

    if (screenshot) {
      screenshotBase64 = await FileSystem.readAsStringAsync(screenshot, {
        encoding: "base64",
      });
      screenshotBase64 = prefix + screenshotBase64;
    }

    try {
      await api.post("/feedback", {
        type: feedbackType,
        comment,
        screenshot: screenshotBase64,
      });
      onFeedbackSent();
    } catch (error) {
      console.log(error);
      setIsSendingFeedback(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>
      <TextInput
        multiline
        value={comment}
        onChangeText={setComment}
        autoCorrect={false}
        style={styles.input}
        selectionColor={theme.colors.brand}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          screenshot={screenshot}
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
        />
        <Button
          isLoading={isSendingFeedback}
          onPress={handleSentFeedback}
          disabled={isSendingFeedback}
        />
      </View>
    </View>
  );
}
