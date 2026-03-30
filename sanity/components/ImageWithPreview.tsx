'use client'

import { useCallback, useMemo } from 'react'
import { Box, Card, Flex, Stack, Text, Badge } from '@sanity/ui'
import { type ObjectInputProps, type ImageValue } from 'sanity'
import imageUrlBuilder from '@sanity/image-url'
import { useClient } from 'sanity'

type ImageInputProps = ObjectInputProps<ImageValue>

const PREVIEW_RATIOS = [
  { name: 'Card (4:3)', ratio: 4 / 3, width: 160, description: 'Services grid' },
  { name: 'Wide (16:9)', ratio: 16 / 9, width: 180, description: 'Blog headers' },
  { name: 'Square (1:1)', ratio: 1, width: 120, description: 'Thumbnails' },
]

export function ImageWithPreview(props: ImageInputProps) {
  const { value, renderDefault } = props
  const client = useClient({ apiVersion: '2024-01-01' })

  const builder = useMemo(() => imageUrlBuilder(client), [client])

  const hasImage = value?.asset?._ref
  const hasHotspot = value?.hotspot?.x !== undefined && value?.hotspot?.y !== undefined
  const hasCrop = value?.crop && (
    value.crop.top !== 0 ||
    value.crop.bottom !== 0 ||
    value.crop.left !== 0 ||
    value.crop.right !== 0
  )

  const getPreviewUrl = useCallback(
    (width: number, height: number) => {
      if (!value?.asset?._ref) return null

      let imageBuilder = builder.image(value).width(width).height(height).fit('crop')

      if (value.hotspot) {
        imageBuilder = imageBuilder.focalPoint(value.hotspot.x, value.hotspot.y)
      }

      if (value.crop) {
        imageBuilder = imageBuilder.rect(
          Math.round(value.crop.left * 100),
          Math.round(value.crop.top * 100),
          Math.round((1 - value.crop.left - value.crop.right) * 100),
          Math.round((1 - value.crop.top - value.crop.bottom) * 100)
        )
      }

      return imageBuilder.url()
    },
    [builder, value]
  )

  return (
    <Stack space={4}>
      {renderDefault(props)}

      {hasImage && (
        <Card padding={4} radius={2} tone="transparent" style={{ background: '#f9f9f9' }}>
          <Stack space={4}>
            <Flex align="center" gap={2}>
              <Text size={1} weight="semibold">
                Crop Previews
              </Text>
              {!hasHotspot && (
                <Badge tone="caution" fontSize={0}>
                  Set hotspot for better crops
                </Badge>
              )}
              {hasHotspot && (
                <Badge tone="positive" fontSize={0}>
                  Hotspot set
                </Badge>
              )}
            </Flex>

            <Flex gap={3} wrap="wrap">
              {PREVIEW_RATIOS.map((preset) => {
                const height = Math.round(preset.width / preset.ratio)
                const url = getPreviewUrl(preset.width * 2, height * 2)

                return (
                  <Box key={preset.name}>
                    <Stack space={2}>
                      <Box
                        style={{
                          width: preset.width,
                          height: height,
                          borderRadius: 6,
                          overflow: 'hidden',
                          background: '#e0e0e0',
                          border: '1px solid #ddd',
                        }}
                      >
                        {url && (
                          <img
                            src={url}
                            alt={`${preset.name} preview`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        )}
                      </Box>
                      <Text size={0} muted style={{ textAlign: 'center' }}>
                        {preset.name}
                      </Text>
                      <Text size={0} muted style={{ textAlign: 'center', fontSize: '10px' }}>
                        {preset.description}
                      </Text>
                    </Stack>
                  </Box>
                )
              })}
            </Flex>

            <Text size={0} muted>
              Click the image above, then click &quot;Edit&quot; to set the hotspot (drag the circle to faces/important areas).
            </Text>
          </Stack>
        </Card>
      )}
    </Stack>
  )
}
