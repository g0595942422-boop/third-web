with open('src/pages/AIRecommendation.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

old = """type Message = {
  role: "user" | "assistant";
  content: string;
};"""

new = """type Message = {
  role: "user" | "assistant";
  content: string;
};

// 打字机效果 hook
function useTypingEffect(text: string, speed: number = 25) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!text) { setDisplayed(''); setDone(true); return; }
    setDisplayed('');
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayed, done };
}"""

c = c.replace(old, new, 1)

# 第二步: 找出打字机消息渲染，把最新 AI 消息换成打字机显示
# 找到 "{messages.map((msg, index) => (" 下面的 "{msg.content}"
# 只在最后一条 AI 消息用打字机，之前的已经完成的消息直接显示
old2 = '''                    <Typography.Text style={{ color: msg.role === "user" ? "#fff" : "rgba(15,23,42,0.85)", fontSize: 14, position: "relative", zIndex: 1 }}>
                      {msg.content}
                    </Typography.Text>'''

new2 = '''                    <Typography.Text style={{ color: msg.role === "user" ? "#fff" : "rgba(15,23,42,0.85)", fontSize: 14, position: "relative", zIndex: 1 }}>
                      {(() => {
                        if (msg.role === "user") return msg.content;
                        // 最后一条 AI 消息用打字机，前面的直接显示
                        const msgs = messages.filter(m => m.role === "assistant");
                        const isLatest = msg === msgs[msgs.length - 1];
                        if (!isLatest) return msg.content;
                        const { displayed, done } = useTypingEffect(msg.content, 20);
                        return displayed + (done ? '' : <span className="typing-cursor" />);
                      })()}
                    </Typography.Text>'''

c = c.replace(old2, new2, 1)

with open('src/pages/AIRecommendation.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print('Done!')"