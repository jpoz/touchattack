var mode = 'defend';
// var mode = 'attack';

var gameSpeed = 1000; //time player has to hit box
var boxSize = 80;
var benchSize = 15;
var refreshRate = 1000;
var refreshAmount = 50;
var shotCost = 20;
var blockValue = 10;
var gameLength = 30000;

var levels = [
  // 1000 1 in 6
  [[4100, 318, 118, "grow"], [5100, 58, 97, "grow"], [6100, 243, 55, "growdown"], [7100, 178, 88, "grow"], [8100, 88, 130, "grow"], [9100, 152, 170, "grow"], [10100, 95, 187, "grow"], [11100, 152, 59, "grow"], [12100, 145, 185, "grow"], [13100, 44, 128, "grow"], [14100, 253, 102, "grow"], [15100, 337, 190, "growleft"], [16100, 301, 118, "grow"], [17100, 318, 79, "grow"], [18100, 153, 126, "growright"], [19100, 333, 192, "grow"], [20100, 286, 106, "grow"], [21100, 338, 120, "grow"], [22100, 235, 54, "grow"], [23100, 132, 165, "grow"], [24100, 91, 64, "grow"], [25100, 203, 133, "grow"], [26100, 66, 106, "grow"], [27100, 132, 129, "grow"], [28100, 232, 197, "grow"], [29100, 153, 55, "grow"], [30100, 138, 132, "grow"], [31100, 234, 157, "grow"], [32100, 63, 184, "grow"]],
  // 910 1 in 5
  [[4100, 340, 61, "grow"], [5010, 100, 195, "grow"], [5920, 109, 144, "grow"], [6830, 169, 191, "grow"], [7740, 95, 128, "grow"], [8650, 329, 132, "grow"], [9560, 286, 110, "grow"], [10470, 147, 177, "grow"], [11380, 225, 69, "grow"], [12290, 164, 160, "grow"], [13200, 219, 186, "grow"], [14110, 96, 137, "grow"], [15020, 274, 102, "grow"], [15930, 306, 72, "grow"], [16840, 110, 59, "growright"], [17750, 164, 82, "growright"], [18660, 133, 111, "grow"], [19570, 357, 179, "grow"], [20480, 267, 185, "growleft"], [21390, 259, 185, "grow"], [22300, 120, 144, "grow"], [23210, 105, 129, "grow"], [24120, 200, 185, "grow"], [25030, 99, 163, "grow"], [25940, 284, 90, "growleft"], [26850, 177, 124, "growright"], [27760, 116, 123, "grow"], [28670, 191, 122, "growleft"], [29580, 197, 46, "grow"], [30490, 246, 40, "growleft"], [31400, 60, 195, "grow"]],
  // 820 1 in 4
  [[4100, 353, 152, "growleft"], [4920, 121, 178, "grow"], [5740, 341, 97, "growleft"], [6560, 207, 168, "growleft"], [7380, 107, 166, "grow"], [8200, 109, 126, "grow"], [9020, 78, 168, "grow"], [9840, 82, 40, "grow"], [10660, 88, 190, "grow"], [11480, 237, 147, "grow"], [12300, 110, 83, "grow"], [13120, 131, 109, "growright"], [13940, 330, 197, "grow"], [14760, 224, 141, "grow"], [15580, 348, 111, "grow"], [16400, 171, 72, "grow"], [17220, 322, 120, "grow"], [18040, 87, 97, "grow"], [18860, 309, 143, "grow"], [19680, 235, 97, "grow"], [20500, 207, 142, "grow"], [21320, 342, 167, "grow"], [22140, 103, 162, "growup"], [22960, 117, 45, "grow"], [23780, 61, 179, "grow"], [24600, 349, 44, "growleft"], [25420, 95, 153, "growright"], [26240, 318, 161, "grow"], [27060, 255, 174, "grow"], [27880, 93, 117, "grow"], [28700, 269, 98, "grow"], [29520, 60, 141, "growright"], [30340, 57, 47, "grow"], [31160, 47, 139, "grow"], [31980, 114, 99, "grow"]],
  // 730 1 in 3
  [[4100, 66, 168, "grow"], [4830, 121, 124, "growright"], [5560, 238, 135, "grow"], [6290, 117, 79, "grow"], [7020, 256, 118, "growleft"], [7750, 344, 42, "grow"], [8480, 298, 117, "grow"], [9210, 109, 57, "grow"], [9940, 296, 124, "growleft"], [10670, 280, 47, "growleft"], [11400, 175, 138, "growleft"], [12130, 80, 105, "growright"], [12860, 194, 162, "growup"], [13590, 84, 64, "grow"], [14320, 51, 96, "grow"], [15050, 176, 189, "grow"], [15780, 197, 181, "grow"], [16510, 123, 141, "growright"], [17240, 184, 118, "grow"], [17970, 88, 183, "growright"], [18700, 283, 96, "grow"], [19430, 346, 49, "grow"], [20160, 88, 92, "grow"], [20890, 188, 109, "growright"], [21620, 270, 69, "grow"], [22350, 111, 176, "growright"], [23080, 167, 191, "growright"], [23810, 243, 196, "growup"], [24540, 313, 118, "grow"], [25270, 59, 72, "grow"], [26000, 327, 74, "growleft"], [26730, 289, 51, "grow"], [27460, 168, 154, "grow"], [28190, 172, 187, "growleft"], [28920, 336, 101, "grow"], [29650, 140, 105, "grow"], [30380, 253, 181, "grow"], [31110, 318, 101, "growleft"], [31840, 194, 97, "growright"]],
  // 640 1 in 2
  [[4100, 120, 148, "grow"], [4740, 60, 149, "growright"], [5380, 91, 96, "growright"], [6020, 337, 162, "grow"], [6660, 104, 153, "growright"], [7300, 186, 120, "growleft"], [7940, 209, 68, "growright"], [8580, 166, 40, "grow"], [9220, 54, 189, "grow"], [9860, 120, 117, "grow"], [10500, 296, 147, "grow"], [11140, 271, 165, "grow"], [11780, 40, 181, "grow"], [12420, 69, 102, "grow"], [13060, 292, 76, "growleft"], [13700, 265, 93, "growleft"], [14340, 87, 170, "growright"], [14980, 159, 121, "growright"], [15620, 252, 93, "grow"], [16260, 100, 112, "grow"], [16900, 202, 69, "grow"], [17540, 127, 155, "growright"], [18180, 63, 132, "grow"], [18820, 71, 132, "growright"], [19460, 201, 134, "grow"], [20100, 133, 116, "growright"], [20740, 124, 51, "grow"], [21380, 218, 192, "growup"], [22020, 217, 125, "grow"], [22660, 138, 52, "growright"], [23300, 135, 141, "growright"], [23940, 249, 150, "grow"], [24580, 81, 123, "growright"], [25220, 171, 113, "grow"], [25860, 277, 62, "grow"], [26500, 327, 161, "grow"], [27140, 90, 142, "growright"], [27780, 353, 79, "growdown"], [28420, 140, 163, "grow"], [29060, 257, 188, "growup"], [29700, 168, 147, "grow"], [30340, 225, 160, "growup"], [30980, 125, 178, "grow"], [31620, 289, 184, "grow"], [32260, 125, 162, "grow"]],
  // 550 1 in 1
  [[4100, 157, 190, "growright"], [4650, 334, 85, "growleft"], [5200, 213, 195, "growleft"], [5750, 277, 177, "growleft"], [6300, 239, 114, "growleft"], [6850, 250, 68, "growdown"], [7400, 246, 150, "growleft"], [7950, 48, 66, "growright"], [8500, 235, 194, "growup"], [9050, 349, 119, "growleft"], [9600, 336, 72, "growdown"], [10150, 113, 111, "growright"], [10700, 283, 48, "growleft"], [11250, 315, 188, "growleft"], [11800, 91, 118, "growright"], [12350, 291, 197, "growleft"], [12900, 317, 155, "growleft"], [13450, 323, 95, "growleft"], [14000, 331, 130, "growleft"], [14550, 131, 115, "growright"], [15100, 296, 178, "growleft"], [15650, 247, 172, "growleft"], [16200, 162, 190, "growright"], [16750, 137, 174, "growup"], [17300, 80, 75, "growright"], [17850, 205, 110, "growleft"], [18400, 179, 138, "growleft"], [18950, 310, 61, "growleft"], [19500, 204, 190, "growright"], [20050, 163, 196, "growleft"], [20600, 239, 191, "growright"], [21150, 295, 54, "growdown"], [21700, 60, 199, "growup"], [22250, 44, 118, "growright"], [22800, 125, 192, "growright"], [23350, 195, 43, "growdown"], [23900, 333, 164, "growleft"], [24450, 114, 198, "growright"], [25000, 213, 70, "growleft"], [25550, 358, 119, "growleft"], [26100, 243, 139, "growleft"], [26650, 44, 148, "growright"], [27200, 264, 186, "growleft"], [27750, 169, 153, "growleft"], [28300, 71, 82, "growright"], [28850, 131, 47, "growright"], [29400, 180, 177, "growleft"], [29950, 83, 192, "growright"], [30500, 281, 65, "growdown"], [31050, 80, 60, "growdown"], [31600, 356, 149, "growleft"], [32150, 235, 137, "growright"]],
  // 460 1 in 1
  [[4100, 117, 90, "growright"], [4560, 281, 122, "growleft"], [5020, 287, 147, "growleft"], [5480, 354, 105, "growleft"], [5940, 166, 160, "growleft"], [6400, 349, 187, "growleft"], [6860, 144, 138, "growright"], [7320, 270, 85, "growleft"], [7780, 309, 151, "growleft"], [8240, 324, 158, "growleft"], [8700, 202, 136, "growright"], [9160, 274, 59, "growdown"], [9620, 121, 154, "growright"], [10080, 263, 174, "growup"], [10540, 279, 136, "growleft"], [11000, 352, 67, "growleft"], [11460, 296, 85, "growleft"], [11920, 355, 87, "growleft"], [12380, 126, 125, "growright"], [12840, 224, 131, "growright"], [13300, 144, 196, "growup"], [13760, 141, 140, "growright"], [14220, 104, 146, "growright"], [14680, 284, 61, "growleft"], [15140, 164, 176, "growleft"], [15600, 207, 134, "growright"], [16060, 83, 72, "growdown"], [16520, 162, 102, "growright"], [16980, 301, 134, "growleft"], [17440, 43, 67, "growdown"], [17900, 243, 60, "growleft"], [18360, 191, 156, "growright"], [18820, 71, 80, "growright"], [19280, 273, 106, "growleft"], [19740, 139, 79, "growdown"], [20200, 301, 83, "growleft"], [20660, 164, 92, "growright"], [21120, 278, 187, "growleft"], [21580, 297, 64, "growleft"], [22040, 58, 69, "growdown"], [22500, 161, 184, "growright"], [22960, 315, 156, "growleft"], [23420, 344, 183, "growleft"], [23880, 64, 90, "growright"], [24340, 336, 63, "growdown"], [24800, 105, 94, "growright"], [25260, 115, 192, "growup"], [25720, 57, 128, "growright"], [26180, 153, 189, "growup"], [26640, 318, 99, "growleft"], [27100, 356, 145, "growleft"], [27560, 289, 65, "growdown"], [28020, 315, 63, "growleft"], [28480, 70, 160, "growright"], [28940, 202, 185, "growup"], [29400, 302, 72, "growdown"], [29860, 322, 198, "growup"], [30320, 124, 157, "growright"], [30780, 151, 129, "growright"], [31240, 182, 57, "growleft"], [31700, 170, 42, "growright"], [32160, 292, 137, "growleft"], [32620, 156, 126, "growright"]],
  // 370 1 in 1
  [[4100, 159, 57, "growdown"], [4470, 274, 134, "growleft"], [4840, 208, 152, "growleft"], [5210, 191, 96, "growleft"], [5580, 225, 100, "growleft"], [5950, 78, 146, "growright"], [6320, 227, 189, "growup"], [6690, 112, 135, "growright"], [7060, 91, 125, "growright"], [7430, 92, 119, "growright"], [7800, 331, 185, "growleft"], [8170, 97, 192, "growright"], [8540, 280, 153, "growleft"], [8910, 169, 188, "growright"], [9280, 356, 179, "growleft"], [9650, 83, 88, "growright"], [10020, 219, 193, "growup"], [10390, 358, 113, "growleft"], [10760, 274, 52, "growdown"], [11130, 97, 121, "growright"], [11500, 201, 71, "growleft"], [11870, 202, 49, "growright"], [12240, 162, 55, "growdown"], [12610, 132, 122, "growright"], [12980, 322, 155, "growleft"], [13350, 109, 66, "growright"], [13720, 346, 130, "growleft"], [14090, 148, 82, "growright"], [14460, 53, 119, "growright"], [14830, 110, 158, "growright"], [15200, 168, 168, "growup"], [15570, 42, 145, "growright"], [15940, 304, 179, "growup"], [16310, 333, 69, "growleft"], [16680, 205, 194, "growright"], [17050, 41, 85, "growright"], [17420, 300, 80, "growdown"], [17790, 352, 181, "growup"], [18160, 141, 181, "growup"], [18530, 145, 50, "growdown"], [18900, 49, 101, "growright"], [19270, 126, 41, "growdown"], [19640, 125, 156, "growright"], [20010, 253, 199, "growleft"], [20380, 138, 96, "growright"], [20750, 225, 96, "growright"], [21120, 252, 181, "growleft"], [21490, 95, 157, "growright"], [21860, 170, 62, "growdown"], [22230, 76, 140, "growright"], [22600, 295, 153, "growleft"], [22970, 224, 41, "growright"], [23340, 281, 153, "growleft"], [23710, 298, 167, "growup"], [24080, 199, 160, "growleft"], [24450, 229, 109, "growleft"], [24820, 345, 73, "growleft"], [25190, 313, 44, "growdown"], [25560, 196, 75, "growdown"], [25930, 308, 108, "growleft"], [26300, 80, 178, "growup"], [26670, 70, 145, "growright"], [27040, 75, 75, "growdown"], [27410, 204, 151, "growleft"], [27780, 83, 179, "growup"], [28150, 48, 82, "growright"], [28520, 84, 169, "growup"], [28890, 148, 40, "growright"], [29260, 236, 113, "growright"], [29630, 93, 67, "growdown"], [30000, 44, 194, "growright"], [30370, 179, 183, "growleft"], [30740, 130, 48, "growright"], [31110, 246, 184, "growup"], [31480, 202, 114, "growleft"], [31850, 290, 142, "growleft"], [32220, 224, 122, "growleft"], [32590, 57, 179, "growup"]],
  // 280 1 in 1
  [[4100, 101, 109, "growright"], [4380, 148, 47, "growright"], [4660, 171, 136, "growleft"], [4940, 318, 108, "growleft"], [5220, 45, 174, "growright"], [5500, 348, 104, "growleft"], [5780, 209, 118, "growright"], [6060, 227, 190, "growright"], [6340, 315, 133, "growleft"], [6620, 45, 198, "growup"], [6900, 96, 78, "growdown"], [7180, 158, 146, "growright"], [7460, 55, 84, "growright"], [7740, 136, 195, "growup"], [8020, 153, 191, "growright"], [8300, 83, 74, "growdown"], [8580, 218, 63, "growdown"], [8860, 246, 80, "growdown"], [9140, 114, 45, "growdown"], [9420, 139, 106, "growright"], [9700, 280, 183, "growup"], [9980, 46, 101, "growright"], [10260, 63, 69, "growright"], [10540, 333, 45, "growleft"], [10820, 217, 66, "growright"], [11100, 273, 112, "growleft"], [11380, 326, 187, "growleft"], [11660, 94, 167, "growright"], [11940, 73, 165, "growup"], [12220, 179, 110, "growleft"], [12500, 288, 40, "growleft"], [12780, 332, 132, "growleft"], [13060, 77, 141, "growright"], [13340, 222, 182, "growright"], [13620, 165, 55, "growright"], [13900, 327, 79, "growleft"], [14180, 75, 85, "growright"], [14460, 251, 127, "growleft"], [14740, 155, 137, "growright"], [15020, 91, 54, "growdown"], [15300, 290, 169, "growleft"], [15580, 154, 148, "growright"], [15860, 201, 63, "growleft"], [16140, 85, 103, "growright"], [16420, 302, 189, "growup"], [16700, 123, 124, "growright"], [16980, 312, 97, "growleft"], [17260, 336, 54, "growdown"], [17540, 316, 92, "growleft"], [17820, 148, 41, "growright"], [18100, 71, 154, "growright"], [18380, 243, 116, "growleft"], [18660, 331, 183, "growleft"], [18940, 43, 166, "growup"], [19220, 312, 79, "growleft"], [19500, 339, 130, "growleft"], [19780, 287, 91, "growleft"], [20060, 97, 192, "growright"], [20340, 83, 148, "growright"], [20620, 116, 182, "growright"], [20900, 239, 98, "growleft"], [21180, 99, 80, "growright"], [21460, 243, 84, "growleft"], [21740, 245, 144, "growleft"], [22020, 101, 97, "growright"], [22300, 297, 113, "growleft"], [22580, 309, 89, "growleft"], [22860, 177, 67, "growright"], [23140, 66, 57, "growdown"], [23420, 331, 70, "growleft"], [23700, 186, 176, "growright"], [23980, 138, 81, "growright"], [24260, 204, 97, "growleft"], [24540, 278, 196, "growup"], [24820, 148, 110, "growright"], [25100, 237, 183, "growright"], [25380, 120, 134, "growright"], [25660, 286, 170, "growleft"], [25940, 351, 109, "growleft"], [26220, 261, 55, "growdown"], [26500, 191, 190, "growleft"], [26780, 359, 153, "growleft"], [27060, 314, 40, "growleft"], [27340, 297, 116, "growleft"], [27620, 194, 75, "growright"], [27900, 284, 154, "growleft"], [28180, 75, 190, "growup"], [28460, 69, 56, "growdown"], [28740, 338, 52, "growdown"], [29020, 73, 133, "growright"], [29300, 353, 148, "growleft"], [29580, 194, 144, "growleft"], [29860, 270, 116, "growleft"], [30140, 213, 71, "growleft"], [30420, 252, 81, "growleft"], [30700, 275, 169, "growup"], [30980, 252, 44, "growleft"], [31260, 281, 105, "growleft"], [31540, 224, 121, "growright"], [31820, 231, 178, "growleft"], [32100, 72, 122, "growright"], [32380, 115, 92, "growright"], [32660, 85, 189, "growup"]],
  // 190 1 in 1
  [[4100, 71, 161, "growright"], [4290, 94, 113, "growright"], [4480, 95, 53, "growright"], [4670, 114, 56, "growdown"], [4860, 341, 111, "growleft"], [5050, 100, 82, "growright"], [5240, 326, 43, "growdown"], [5430, 313, 65, "growdown"], [5620, 281, 153, "growleft"], [5810, 348, 119, "growleft"], [6000, 169, 178, "growleft"], [6190, 291, 72, "growleft"], [6380, 105, 121, "growright"], [6570, 264, 181, "growup"], [6760, 276, 194, "growup"], [6950, 357, 185, "growleft"], [7140, 127, 49, "growright"], [7330, 175, 170, "growleft"], [7520, 173, 186, "growup"], [7710, 151, 120, "growright"], [7900, 289, 161, "growup"], [8090, 283, 96, "growleft"], [8280, 140, 129, "growright"], [8470, 199, 169, "growleft"], [8660, 184, 65, "growright"], [8850, 340, 69, "growdown"], [9040, 211, 156, "growleft"], [9230, 173, 106, "growleft"], [9420, 332, 50, "growleft"], [9610, 121, 198, "growright"], [9800, 166, 68, "growdown"], [9990, 285, 163, "growup"], [10180, 187, 172, "growup"], [10370, 56, 105, "growright"], [10560, 64, 45, "growright"], [10750, 287, 144, "growleft"], [10940, 107, 108, "growright"], [11130, 294, 91, "growleft"], [11320, 97, 185, "growright"], [11510, 154, 119, "growright"], [11700, 91, 147, "growright"], [11890, 342, 128, "growleft"], [12080, 310, 89, "growleft"], [12270, 99, 161, "growup"], [12460, 134, 128, "growright"], [12650, 73, 42, "growright"], [12840, 322, 142, "growleft"], [13030, 336, 82, "growleft"], [13220, 97, 94, "growright"], [13410, 349, 49, "growleft"], [13600, 188, 69, "growright"], [13790, 212, 141, "growleft"], [13980, 96, 199, "growup"], [14170, 285, 42, "growdown"], [14360, 340, 64, "growleft"], [14550, 121, 162, "growup"], [14740, 99, 197, "growup"], [14930, 320, 41, "growdown"], [15120, 166, 99, "growleft"], [15310, 266, 81, "growleft"], [15500, 230, 112, "growleft"], [15690, 173, 151, "growright"], [15880, 151, 41, "growdown"], [16070, 235, 145, "growleft"], [16260, 44, 131, "growright"], [16450, 124, 158, "growright"], [16640, 81, 151, "growright"], [16830, 159, 73, "growright"], [17020, 190, 60, "growdown"], [17210, 314, 87, "growleft"], [17400, 334, 167, "growleft"], [17590, 98, 176, "growright"], [17780, 52, 119, "growright"], [17970, 324, 160, "growleft"], [18160, 215, 43, "growdown"], [18350, 106, 115, "growright"], [18540, 154, 41, "growdown"], [18730, 344, 49, "growleft"], [18920, 165, 98, "growright"], [19110, 89, 157, "growright"], [19300, 164, 64, "growright"], [19490, 312, 51, "growdown"], [19680, 154, 194, "growright"], [19870, 130, 155, "growright"], [20060, 298, 145, "growleft"], [20250, 88, 94, "growright"], [20440, 144, 125, "growright"], [20630, 295, 145, "growleft"], [20820, 236, 168, "growright"], [21010, 253, 166, "growup"], [21200, 116, 53, "growdown"], [21390, 255, 103, "growleft"], [21580, 346, 73, "growdown"], [21770, 80, 186, "growright"], [21960, 245, 114, "growleft"], [22150, 287, 47, "growleft"], [22340, 204, 40, "growdown"], [22530, 95, 177, "growright"], [22720, 108, 138, "growright"], [22910, 164, 42, "growleft"], [23100, 268, 128, "growleft"], [23290, 306, 176, "growleft"], [23480, 186, 92, "growright"], [23670, 82, 52, "growdown"], [23860, 322, 191, "growleft"], [24050, 209, 169, "growright"], [24240, 308, 190, "growup"], [24430, 336, 107, "growleft"], [24620, 62, 80, "growright"], [24810, 181, 113, "growleft"], [25000, 131, 111, "growright"], [25190, 316, 88, "growleft"], [25380, 73, 40, "growright"], [25570, 338, 55, "growleft"], [25760, 85, 66, "growdown"], [25950, 199, 120, "growleft"], [26140, 220, 196, "growup"], [26330, 204, 138, "growright"], [26520, 168, 128, "growright"], [26710, 152, 61, "growright"], [26900, 152, 175, "growright"], [27090, 59, 83, "growright"], [27280, 118, 183, "growright"], [27470, 158, 44, "growright"], [27660, 153, 173, "growup"], [27850, 282, 75, "growleft"], [28040, 98, 167, "growup"], [28230, 252, 196, "growleft"], [28420, 56, 75, "growright"], [28610, 338, 61, "growdown"], [28800, 359, 100, "growleft"], [28990, 273, 144, "growleft"], [29180, 80, 183, "growright"], [29370, 48, 162, "growright"], [29560, 241, 40, "growdown"], [29750, 108, 56, "growdown"], [29940, 153, 141, "growright"], [30130, 152, 104, "growright"], [30320, 226, 40, "growleft"], [30510, 243, 69, "growdown"], [30700, 337, 194, "growup"], [30890, 58, 41, "growdown"], [31080, 120, 83, "growright"], [31270, 91, 175, "growright"], [31460, 293, 51, "growleft"], [31650, 104, 92, "growright"], [31840, 359, 88, "growleft"], [32030, 306, 42, "growdown"], [32220, 239, 184, "growright"], [32410, 87, 169, "growup"], [32600, 50, 153, "growright"], [32790, 215, 145, "growleft"], [32980, 269, 48, "growdown"]]

];

var red = '#DE4448'
var green = '#51B45B'
var yellow = '#DECE67'
var blue = '#5E84BE'

var powerDiv;
var game_board;
var gameStartTime;
var currentLevel;

var attackSequence = [];
var bench = [];
var powerLevel = 100;
var currentTouches = [];
var gameActive = false;
var blockedCount = 0;
var totalCount = 0;

var debugDiv;

$(document).ready(function() {
  TouchAttack.setup();
});


var TouchAttack = {
  setup: function(attribute){
    if (navigator.appVersion.indexOf('iPhone OS ') < 0) {
      this.warn('Oops come back to this site on your iPhone or iPod Touch.');
      return;
    }
    
    document.addEventListener("touchmove", TouchAttack.disableTouch, false);
    
    document.documentElement.style.webkitTouchCallout = "none";
    
    if (!window.navigator.standalone ) { 
      this.warn('Click the + and select "Add to Home Screen" to install TouchAttack');
      return;
    }
    
    window.onorientationchange = TouchAttack.onorientationchange;
        
    this.onorientationchange();
    
    for (var i=benchSize;i>0;i--) {
      var square = $.engineer.make('attack_square', { 
        onTouchStartFuntion: TouchAttack[mode],
        onTouchEndFuntion: TouchAttack['un'+mode]
      });
      $('body').append(square);
      bench.push(square);
    }
    
    game_board = document.getElementById('game_board'); 
    document.body.ontouchstart = TouchAttack.disableTouch;

    powerDiv = $('#powerLevel');
    debugDiv = $('#debug');
    
    powerDiv.css('width',powerLevel + '%');
    
    for (var i=levels.length;i>0;i--) {
        var div = document.getElementById('level'+i+'start');
        if (i == 1 || localStorage['level'+i]) {
          $(div).removeClass('disabled');
          div.level = i;
          div.ontouchend = function() {
            // location.reload(true);
            TouchAttack.start(this);
          };
          div.ontouchstart = function() {
            // location.reload(true);
            $(this).css('background',yellow);
          };
        }
    }

    document.getElementById('reload').ontouchend = function() {
      location.reload(true);
    }
  
  },
  warn: function(warning) {
    $('#warning')
      .fadeIn()
      .find('#warningText')
        .text(warning);
  },
  unwarn: function() {
    $('#warning').fadeOut();
    $('#game').fadeIn();
  },
  onorientationchange: function() {
    window.scrollTo(0, 1)
    var orientation = window.orientation;

    if (0 == (90 % orientation)) {
      TouchAttack.unwarn();
    } else {
      TouchAttack.warn('This game is meant to be played in landscape. Please rotate your device.');
    }
  },
  start: function(levelDiv){
    currentLevel = levelDiv.level;

    $('#Level').text('Level ' + currentLevel);
    
    attackSequence = levels[currentLevel-1];
      
    totalCount = attackSequence.length;
    
    TouchAttack.moveMenuTo(-320); // Level
    setTimeout(TouchAttack.moveMenuTo, 1000, -640); // 3
    setTimeout(TouchAttack.moveMenuTo, 2000, -960); // 2
    setTimeout(TouchAttack.moveMenuTo, 3000, -1280); // 2
    setTimeout(TouchAttack.moveMenuTo, 4000, -1920); // GO
    
    setTimeout(TouchAttack.startTimer, 4000);
    
    this[mode+'Start'](); // let's get this party started
  },
  startTimer: function(){
    timerDiv = $('#timerLevel');
    timerDiv.css({'width':'0%','background-color':red });
    setTimeout(TouchAttack.gameOver, gameLength, true);
    gameStartTime = new Date;
  },
  attackStart: function() {
    attackSequence = [];
    
    game_board.ontouchstart = TouchAttack.attack;
    game_board.ontouchmove = TouchAttack.disableTouch;
    
    setTimeout(TouchAttack.refreshPower, refreshRate);
    
    gameActive = true;
  },
  attack: function(e) {
    e.preventDefault();
    $.each(e.touches, function(i,t) {
      var x = t.pageX - (boxSize/2);
      var y = t.pageY - (boxSize/2);
      bench.push(bench.shift().send('attack', x, y));
      
      attackSequence.push([(new Date) - gameStartTime, x, y]);
    });
  },
  unattack: function(e) {
    e.preventDefault();
  },
  defendStart: function() {
    game_board.ontouchstart = TouchAttack.disableTouch;
    game_board.ontouchmove = TouchAttack.disableTouch;
    
    $.each(attackSequence, function(i,a) {
      setTimeout(TouchAttack.shoot, a.shift(), a.shift(), a.shift(), a.shift());
    });
    
    gameActive = true;
  },
  defend: function(e) {
    e.preventDefault();
    $(this).css({
      'background-color':yellow
    });
  },
  undefend: function(e) {
    $(this).css('display','none').data('touched',true);
  },
  shoot: function(x, y, direction) {
    if (gameActive) {
      var square = bench.shift().send('shoot', x, y, direction);
      bench.push(square);
      setTimeout(TouchAttack.blocked, gameSpeed, square);
    }
  },
  blocked: function(elem) {
    if (!elem.data('touched')) {
      elem.css('background', red);
      powerDiv.css('background', red);
      powerLevel = powerLevel - shotCost;
    } else {
      blockedCount++;
      powerDiv.css('background', green);
      powerLevel = powerLevel + blockValue;
      if (powerLevel > 100) { powerLevel = 100 };
    }
    powerDiv.css('width',powerLevel + '%');
    
    if (powerLevel < 1) {
      TouchAttack.gameOver(false);
    }
  },
  powerReady: function() {
    return !!(powerDiv.width() > (shotCost/480) & powerLevel > shotCost)
  },
  refreshPower: function() {
    powerLevel = powerLevel + refreshAmount;
    if (powerLevel > shotCost){
      powerDiv.css('background-color',green);
    }
    if (powerLevel > 100) { powerLevel = 100 };
    powerDiv.css('width',powerLevel + '%');
    setTimeout(TouchAttack.refreshPower, refreshRate);
  },
  gameOver: function(lived) {
    if (gameActive) {
      gameActive = false;

      game_board.ontouchstart = function() {};
      
      if (lived) {
        var resultText = "You made it! Your score was:";
        var resultColor = 'white';
        currentLevel++;
        localStorage['level'+currentLevel] = true;
      } else {
        var resultText = "You died, but you made it out with:";
        var resultColor = red;
      }
      
      $('.resultDescription').text(resultText).css('color',resultColor);
      $('#results').css('top',0);
      $('#blocked').text(blockedCount);
      $('#total').text(totalCount);
    }
  },
  disableTouch: function(event)
  {
  	event.preventDefault();
  },
  moveMenuTo: function(top){
    $('#menu').css('top',top);
  }
}

$.engineer.define('attack_square',{
  defaults: {
    onTouchStartFuntion: function() {},
    onTouchEndFuntion: function() {}
  },
  structure: function(options) {
    return $('<div/>', {
      css: {
        'background':blue,
        'position':'absolute',
        'top':-9,
        'left':0,
        'width':'1px',
        'height':'1px'
      }
    });
  },
  behavior: function(options) {
    var self = this;
    var publicMethods = {
      attack: function(x,y) {
        self.css({
          'top':y,
          'left':x,
          '-webkit-animation-name': 'shrink',
          '-webkit-animation-duration': (gameSpeed/1000)+'s'
        });
      },
      shoot: function(x,y,direction) {
        self.data('touched',false);
        self.css({
          'display':'block',
          'background':blue,
          'top':y,
          'left':x,
          '-webkit-animation-name': direction,
          '-webkit-animation-duration': (gameSpeed/1000)+'s'
        });
      }
    }
    
    self[0].ontouchstart = options.onTouchStartFuntion;
    self[0].ontouchend = options.onTouchEndFuntion;
    self[0].ontouchmove = function(e) { e.preventDefault(); }
    
    self.bind('webkitAnimationEnd', function (){ 
      bench.push(self.css({
        'top':-9,
        '-webkit-animation-name': null,
        '-webkit-animation-duration': null
      }));
    });
    
    return publicMethods;
  }
});