# BHRV Verification

BHRV is DerbyFish's cheat-proof catch verification system. Every submitted catch goes through four steps to ensure legitimacy.

## The Four Steps

### 1. Bump Board

The angler places the fish on a standard measuring board and takes a photo. The AI system:
- Detects the measuring board in the image
- Reads the measurement markings
- Estimates fish length

### 2. Hero Shot

A photo of the angler holding the catch. This links the catch to a specific person and provides additional species verification data.

### 3. Release Video

A short video of the fish being released back into the water. This proves:
- The fish was alive and healthy
- The catch happened in real time (not a pre-recorded submission)

### 4. Blockchain Verify

The submission is timestamped on the Flow blockchain. This creates an immutable record that:
- The catch happened at a specific time and GPS location
- The AI species identification was confirmed
- The measurement data was verified

## AI Species Identification

DerbyFish uses computer vision to identify fish species from submission photos. The system:
- Identifies the species from bump board and hero shot images
- Cross-references against the derby's allowed species list
- Flags submissions that need manual review

## Why BHRV Matters

Traditional fishing derbies rely on the honor system or in-person weigh-ins. BHRV allows:
- Remote participation (no need to bring fish to a weigh station)
- Catch and release competitions
- Real-time leaderboard updates
- Verifiable, tamper-proof results
